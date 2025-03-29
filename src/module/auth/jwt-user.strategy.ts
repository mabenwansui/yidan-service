import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './service/auth.service'
import { JwtPayload } from './interface/jwt-payload.interface'

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_CONSTANTS_SECRET
    })
  }

  async validate(jwtPayload: JwtPayload): Promise<JwtPayload> {
    return jwtPayload
  }
}

// const { username } = jwtPayload
// const user = await this.authService.validateUser(username, password)
// if (!user) {
//   throw new HttpException(ERROR_MESSAGE.LOGIN_FAILURE, ERROR_MESSAGE.LOGIN_FAILURE.status)
// }
// return user
