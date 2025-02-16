import { IsNotEmpty } from 'class-validator'

export class LoginAuthDto {
  @IsNotEmpty({ message: `username不能为空` })
  username: string

  @IsNotEmpty({ message: `password不能为空` })
  password: string
}
