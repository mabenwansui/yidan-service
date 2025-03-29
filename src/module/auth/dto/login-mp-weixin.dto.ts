import { IsNotEmpty } from 'class-validator'

export class LoginMpWeixinDto {
  @IsNotEmpty({ message: `code不能为空` })
  code: string
}
