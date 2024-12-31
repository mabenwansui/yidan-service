import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { jwtConstants } from '@/common/constants/secret'

@Injectable()
export class JwtStrategy2 extends PassportStrategy(Strategy, 'jwt2') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any) {
    debugger
    return { userId: payload.sub, username: payload.username, m1: 'm2' }
  }
}
