import { UserInterface } from '../interface/user.interface'
import { IsOptional, IsNotEmpty, IsEmail, IsPhoneNumber, IsArray, IsEnum } from 'class-validator'
import { ROLE } from '@/common/constants/role'

export class UpdateUserDto implements Partial<UserInterface> {
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