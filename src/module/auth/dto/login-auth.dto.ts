import { User } from '@/module/user/interface/user.interface'
import { IsNotEmpty } from 'class-validator'

export class LoginAuthDto implements Pick<User, 'username' | 'password'> {
  @IsNotEmpty({ message: `username不能为空` })
  username: string

  @IsNotEmpty({ message: `password不能为空` })
  password: string
}
