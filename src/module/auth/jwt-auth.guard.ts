import { Reflector } from '@nestjs/core'
import { Injectable, HttpException, ExecutionContext } from '@nestjs/common'
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-auth') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
  handleRequest(err, user): any {
    if (err || !user) {
      throw new HttpException(
        ERROR_MESSAGE.AUTH_CHECK_FAILED,
        ERROR_MESSAGE.AUTH_CHECK_FAILED.status,
      )
    }
    return user
  }
}
