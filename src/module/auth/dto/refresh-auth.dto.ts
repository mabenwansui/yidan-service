import { IsNotEmpty } from 'class-validator'

export class RefreshAuthDto {
  @IsNotEmpty()
  authKey: string
}
