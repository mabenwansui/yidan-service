import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../service/auth.service'
import { JwtPayload } from '../interface/jwt-payload.interface'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          if (req?.cookies?.at) {
            return req?.cookies?.at
          } else {
            return ExtractJwt.fromAuthHeaderAsBearerToken()(req)
          }
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_CONSTANTS_SECRET
    })
  }

  async validate(jwtPayload: JwtPayload): Promise<JwtPayload> {
    return jwtPayload
  }
}

