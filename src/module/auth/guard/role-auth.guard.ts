import { Reflector } from '@nestjs/core'
import { Injectable, HttpException, CanActivate, ExecutionContext } from '@nestjs/common'
import { ROLES as rolesMetadataKey } from './roles.decorator'
import { ROLE } from '@/common/constants/role'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(rolesMetadataKey, context.getHandler())
    const { url, user } = context.switchToHttp().getRequest()
    const { role } = user
    if (role.includes(ROLE.SUPER_ADMIN)) return true
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
