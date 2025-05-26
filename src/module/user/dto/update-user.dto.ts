import {
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsArray,
  IsEnum,
  MaxLength,
  MinLength,
  Matches
} from 'class-validator'
import { ROLE } from '@/common/constants/role'
import { User } from '../schemas/user.schema'
import { OmitType, PartialType } from '@nestjs/mapped-types'
import { pwdReg, maxUserPwdLength, minUserPwdLength } from './create-user.dto'

export class UpdateUserDto extends PartialType(OmitType(User, ['role', 'openidMpWx'])) {
  @IsNotEmpty()
  id: string

  @IsOptional()
  username?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsOptional()
  avatarUrl?: string

  @IsOptional()
  phoneNumber?: string

  @IsOptional()
  nickname?: string

  @Matches(pwdReg)
  @MaxLength(maxUserPwdLength)
  @MinLength(minUserPwdLength)
  @IsOptional()
  password?: string
}

export class UserUpdateRoleDto {
  @IsNotEmpty()
  id: string

  @IsEnum(ROLE, { each: true })
  @IsArray()
  @IsOptional()
  role: ROLE[]
}
