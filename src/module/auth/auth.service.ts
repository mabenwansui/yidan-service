import { HttpException, Injectable } from '@nestjs/common'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from '@/module/user/user.service'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'

const EXPIRE_TIME = 1e3 * 60 * 60 * 24 * 7 // 7 days

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto, response: Response) {
    const { username, password } = loginAuthDto
    const userInfo = await this.validateUser(username, password)
    if (!userInfo) {
      throw new HttpException(ERROR_MESSAGE.LOGIN_FAILURE, ERROR_MESSAGE.LOGIN_FAILURE.status)
    }
    const payload = { username, sub: userInfo.id }
    const jwt = await this.jwtService.signAsync(payload)
    response.cookie('at', jwt, {
      path: '/',
      httpOnly: true,
      maxAge: EXPIRE_TIME,
      sameSite: 'none',
      secure: true,
      // domain: '127.0.0.1',
    })
    return {
      status: 'ok',
      message: '登录成功',
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Pick<UserFoundOneResponseDto, 'id' | 'username'> | null> {
    const userInfo = await this.userService.findByUsername(username)
    if (!userInfo) {
      return null
    }
    const compareResult = await bcrypt.compare(password, userInfo.password)
    if (!compareResult) return null
    const { username: name, id } = userInfo
    return {
      id,
      username: name,
    }
  }

  // async login(user: { username: string; sub: string }) {
  //   const { username, sub } = user
  //   const payload = { username, sub }
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   }
  // }
}

// return {
//   accessToken: await this.jwtService.signAsync(payload),
// }
