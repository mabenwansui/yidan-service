import { PickType } from '@nestjs/mapped-types'
import { MaxLength, MinLength, IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator'
import { User } from '../schemas/user.schema'

export const maxUsernameLength = 30
export const minUsernameLength = 3
export const maxUserPwdLength = 32
export const minUserPwdLength = 6

export const pwdReg = /^[a-zA-Z0-9_\.@!#$%^&*()\-+=}{[\]|;:'"<>,.?\/]+$/

export class CreateUserDto extends PickType(User, ['username', 'openidMpWx']) {
  @MaxLength(maxUsernameLength)
  @MinLength(minUsernameLength)
  @IsNotEmpty()
  username: string

  @IsOptional()
  openidMpWx?: string
}

export class CreateAdminDto extends PickType(User, ['username', 'password', 'role']) {
  @MaxLength(maxUsernameLength)
  @MinLength(minUsernameLength)
  @IsNotEmpty()
  username: string

  @Matches(pwdReg)
  @MaxLength(maxUserPwdLength)
  @MinLength(minUserPwdLength)
  @IsNotEmpty()
  password: string

  @IsString()
  @IsOptional()
  captchaKey?: string

  @IsString()
  @IsOptional()
  captchaVal?: string
}
