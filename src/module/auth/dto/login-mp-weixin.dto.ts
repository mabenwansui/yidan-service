import { IsNotEmpty } from 'class-validator'

export class LoginMpWeixinDto {
  @IsNotEmpty()
  code: string
}
