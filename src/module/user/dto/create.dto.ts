import { User } from '../interface/user.interface'
import { ROLE } from '@/common/constants/role'
import { MaxLength, MinLength, IsNotEmpty, IsString, IsOptional } from 'class-validator'

const maxUsernameLength = 30
const minUsernameLength = 3
const maxUserPwdLength = 32
const minUserPwdLength = 6

const userTitle = '用户名'
const pwdTitle = '密码'

export class CreateDto implements Omit<User, 'id' | 'role'> {
  @IsNotEmpty({ message: `${userTitle}不能为空` })
  @IsString()
  @MaxLength(maxUsernameLength, { message: `${userTitle}长度不能超过${maxUsernameLength}` })
  @MinLength(minUsernameLength, { message: `${userTitle}长度不能少于${minUsernameLength}` })
  username: string // 用户名

  @IsString({ message: '邮箱格式不正确' })
  @IsOptional()
  email?: string // 邮箱
}

export class CreateUserDto extends CreateDto {
  @IsOptional()
  openidMpWx?: string
  role: ROLE[]
}
export class CreateAdminDto extends CreateDto {
  @IsNotEmpty({ message: `${pwdTitle}不能为空` })
  @MaxLength(maxUserPwdLength, { message: `${pwdTitle}长度不能超过${maxUserPwdLength}` })
  @MinLength(minUserPwdLength, { message: `${pwdTitle}长度不能少于${minUserPwdLength}` })
  password: string // 密码 只能包含字母、数字、下划线、点、@、!、#、$、%、^、&、*、(、)、-、+、=、{、}、[、]、|、;、:、'、"、<、>、?、,、.、/

  @IsString({ message: 'captchaKey不正确' })
  @IsOptional()
  captchaKey?: string

  @IsString({ message: 'captchaVal不正确' })
  @IsOptional()
  captchaVal?: string
}
