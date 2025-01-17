import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import { jwtConstants } from '@/common/constants/secret'
import { JwtPayload } from './interface/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(private authService: AuthService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies.maben
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(jwtPayload: JwtPayload): Promise<any> {
    return { userId: jwtPayload.sub, username: jwtPayload.username }
  }
}

// const { username } = jwtPayload
// const user = await this.authService.validateUser(username, password)
// if (!user) {
//   throw new HttpException(ERROR_MESSAGE.LOGIN_FAILURE, ERROR_MESSAGE.LOGIN_FAILURE.status)
// }
// return user
