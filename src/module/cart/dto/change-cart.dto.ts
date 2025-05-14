import { IsNotEmpty } from 'class-validator'

export class ChangeCartDto {
  @IsNotEmpty()
  commodityId?: string

  @IsNotEmpty()
  quantity: number
}
