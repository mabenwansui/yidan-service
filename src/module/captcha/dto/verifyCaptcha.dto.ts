import { IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class VerifyCaptchaDto {
  @IsNotEmpty({ message: '验证码的key不能为空' })
  key: string

  @IsNotEmpty({ message: '验证码的value不能为空' })
  @Type(() => Number)
  val: string
}
