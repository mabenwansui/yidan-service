import { Reflector } from '@nestjs/core'
import { Injectable, HttpException, CanActivate, ExecutionContext } from '@nestjs/common'
import { ROLES } from './roles.decorator'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(ROLES, context.getHandler())
    const { user } = context.switchToHttp().getRequest()
    const { role } = user
    const flag = requiredRoles.some((item) => role.includes(item))
    if (!flag) {
      throw new HttpException(
        ERROR_MESSAGE.AUTH_NOT_PERMISSION,
        ERROR_MESSAGE.AUTH_NOT_PERMISSION.status
      )
    }
    return true
  }
}
