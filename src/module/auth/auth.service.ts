import { HttpException, Injectable } from '@nestjs/common'
import { Response, CookieOptions } from 'express'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { Auth } from './schemas/auth.schemas'
import { UserService } from '@/module/user/user.service'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { generateUuid } from '@/common/utils/generateUuid'
import { COOKIE_KEY } from '@/common/constants/cookie'
import { ROLE } from '@/common/constants/role'

const COOKIE_EXPIRE_TIME = 1e3 * 60 * 60 * 24 * 7 // 7 days
const AUTH_EXPIRE_TIME = 1e3 * 60 * 60 * 24 * 1 // 1 days

interface AuthorizationParams {
  username: string
  id: string
  role: ROLE
}

interface CreateAuthParams {
  userId: string
  userName: string
  expiresIn: Date
}

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
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async adminLogin(loginAuthDto: LoginAuthDto, response: Response) {
    const { username, password } = loginAuthDto
    const userInfo = await this.validateUser(username, password)
    if (!userInfo) {
      throw new HttpException(ERROR_MESSAGE.LOGIN_FAILURE, ERROR_MESSAGE.LOGIN_FAILURE.status)
    }
    const { id } = userInfo
    await this.createToken({ username, id, role: ROLE.ADMIN }, response)
    await this.createRefreshToken(
      {
        userId: id,
        userName: username,
        expiresIn: new Date(Date.now() + COOKIE_EXPIRE_TIME)
      },
      response
    )
    return {
      status: 'ok',
      message: '登录成功'
    }
  }

  async refreshAuth(authKey: string, response: Response) {
    const result = await this.authModel.findOne({ key: authKey })
    if (result) {
      const { userId, userName, expiresIn } = result
      if (Date.now() <= expiresIn.getTime()) {
        await this.createToken({ username: userName, id: userId, role: ROLE.ADMIN }, response)
        return {
          status: 'ok'
        } as const
      }
    }
    throw new HttpException(
      ERROR_MESSAGE.AUTH_REFRESH_CHECK_ERROR,
      ERROR_MESSAGE.AUTH_REFRESH_CHECK_ERROR.status
    )
  }

  private async createRefreshToken(params: CreateAuthParams, response: Response): Promise<void> {
    const { userId, userName, expiresIn } = params
    const result = await this.authModel.findOne({ userId })
    let key: string
    if (result) {
      await this.authModel.updateOne(
        { userId },
        {
          expiresIn
        }
      )
      key = result.key
    } else {
      const authKey = generateUuid()
      await this.authModel.create({
        userId,
        userName,
        key: authKey,
        expiresIn
      })
      key = authKey
    }
    response?.cookie(
      COOKIE_KEY.REFRESH_TOKEN,
      key,
      cookieOptions({
        expires: expiresIn,
        httpOnly: false
      })
    )
  }
  // 授权
  private async createToken(params: AuthorizationParams, response?: Response) {
    const { username, id, role } = params
    const payload = { name: username, sub: id, role }
    const jwt = await this.jwtService.signAsync(payload)
    response?.cookie(
      COOKIE_KEY.AUTH_TOKEN,
      jwt,
      cookieOptions({
        expires: new Date(Date.now() + AUTH_EXPIRE_TIME)
      })
    )
    return jwt
  }

  private async validateUser(
    username: string,
    password: string
  ): Promise<Pick<UserFoundOneResponseDto, 'id' | 'username'> | null> {
    const userInfo = await this.userService.findAllInfoByUsername(username)
    if (!userInfo) {
      return null
    }
    const compareResult = await bcrypt.compare(password, userInfo.password)
    if (!compareResult) return null
    const { username: name, id } = userInfo
    return {
      id,
      username: name
    }
  }
}
