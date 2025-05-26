import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common'
import { ROLE } from '@/common/constants/role'
import { JwtAuthGuard } from './jwt-auth.guard'
import { RoleAuthGuard } from './role-auth.guard'

export function Auth(...roles: ROLE[]) {
  return applyDecorators(SetMetadata('roles', roles || []), UseGuards(JwtAuthGuard, RoleAuthGuard))
}
