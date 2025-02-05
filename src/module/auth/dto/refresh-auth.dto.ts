import { IsNotEmpty } from 'class-validator'

export class RefreshAuthDto {
  @IsNotEmpty({ message: `username不能为空` })
  authKey: string
}
