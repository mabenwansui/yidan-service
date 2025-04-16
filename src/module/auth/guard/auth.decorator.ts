import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RoleAuthGuard } from './role-auth.guard';
import { ROLE } from '@/common/constants/role';

export function Auth(...roles: ROLE[]) {
  return applyDecorators(
    SetMetadata('roles', roles || []),
    UseGuards(JwtAuthGuard, RoleAuthGuard)
  );
}