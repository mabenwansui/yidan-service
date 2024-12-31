import { Injectable, ExecutionContext, HttpException } from '@nestjs/common'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-auth') {
  handleRequest(err, user, info, context, status): any {
    if (err || !user) {
      throw new HttpException(ERROR_MESSAGE.AUTH_CHECK_FAILED, ERROR_MESSAGE.AUTH_CHECK_FAILED.status)
    }
    return user
  }
}
