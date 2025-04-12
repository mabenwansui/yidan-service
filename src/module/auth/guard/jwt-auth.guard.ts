import { Reflector } from '@nestjs/core'
import { Injectable, HttpException } from '@nestjs/common'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-auth') {
  constructor(private reflector: Reflector) {
    super()
  }
  handleRequest(err, user): any {
    if (err || !user) {
      throw new HttpException(
        ERROR_MESSAGE.AUTH_CHECK_ERROR,
        ERROR_MESSAGE.AUTH_CHECK_ERROR.status
      )
    }
    return user
  }
}
