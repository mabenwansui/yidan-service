import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import { JWT_CONSTANTS } from '@/common/constants/secret'
import { JwtPayload } from './interface/jwt-payload.interface'

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies.at
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.SECRET
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
