import { HttpException, Injectable } from '@nestjs/common'
import { Response, CookieOptions } from 'express'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { Auth } from '../schemas/auth.schemas'
import { UserService } from '@/module/user/user.service'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { LoginAuthDto } from '../dto/login-auth.dto'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { COOKIE_KEY } from '@/common/constants/cookie'
import { ROLE } from '@/common/constants/role'
import { BaseService } from './base.service'

const COOKIE_EXPIRE_TIME = 1e3 * 60 * 60 * 24 * 7 // 7 days
const AUTH_EXPIRE_TIME = 1e3 * 60 * 60 * 24 * 1 // 1 days

function cookieOptions(options: CookieOptions) {
  const _options: CookieOptions = {
    path: '/',
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    ...options
  }
  return _options
}

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @InjectModel(Auth.name)
    public readonly authModel: Model<Auth>,
    private userService: UserService,
    public jwtService: JwtService
  ) {
    super(authModel, jwtService)
  }

  async adminLogin(loginAuthDto: LoginAuthDto, response: Response) {
    const { username, password } = loginAuthDto
    const userInfo = await this.validateUser(username, password)
    if (!userInfo) {
      throw new HttpException(ERROR_MESSAGE.LOGIN_FAILURE, ERROR_MESSAGE.LOGIN_FAILURE.status)
    }
    const now = Date.now()
    const { id } = userInfo
    const expiresIn = new Date(now + COOKIE_EXPIRE_TIME)
    const token = await this.createToken({ username, id, role: [ROLE.ADMIN] })
    response?.cookie(
      COOKIE_KEY.AUTH_TOKEN,
      token,
      cookieOptions({
        expires: new Date(now + AUTH_EXPIRE_TIME)
      })
    )
    const refreshKey = await this.createAuthKey({
      userId: id,
      userName: username,
      expiresIn
    })
    response?.cookie(
      COOKIE_KEY.REFRESH_TOKEN,
      refreshKey,
      cookieOptions({
        expires: expiresIn,
        httpOnly: false
      })
    )
    return {
      status: 'ok',
      message: '登录成功'
    }
  }

  public async refreshAuth(authKey: string, response: Response) {
    const token = await this.refreshToken(authKey)
    const now = Date.now()
    response?.cookie(
      COOKIE_KEY.AUTH_TOKEN,
      token,
      cookieOptions({
        expires: new Date(now + AUTH_EXPIRE_TIME)
      })
    )
    return {
      status: 'ok'
    } as const
  }

  private async validateUser(
    username: string,
    password: string
  ): Promise<Pick<UserFoundOneResponseDto, 'id' | 'username'> | null> {
    const userDoc = await this.userService._findOne({ username })
    if (!userDoc) {
      return null
    }
    const compareResult = await bcrypt.compare(password, userDoc.password)
    if (!compareResult) return null
    const { username: name, id } = userDoc
    return {
      id,
      username: name
    }
  }
}
