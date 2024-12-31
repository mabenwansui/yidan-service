import { Injectable } from '@nestjs/common'
import { UserService } from '@/module/user/user.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const userInfo = await this.userService.findByUsername(username)
    const { password: hash } = userInfo
    const compareResult = await bcrypt.compare(password, hash)
    if (compareResult) {
      const { username, id } = userInfo
      return {
        id,
        username
      }
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}
