import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from '@/module/user/user.service'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto
    const userInfo = await this.validateUser(username, password)
    if (!userInfo) {
      throw new HttpException(ERROR_MESSAGE.LOGIN_FAILURE, ERROR_MESSAGE.LOGIN_FAILURE.status)
    }
    const payload = { username, sub: userInfo.id }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Pick<UserFoundOneResponseDto, 'id' | 'username'> | null> {
    const userInfo = await this.userService.findByUsername(username)
    if (!userInfo) { return null }
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
