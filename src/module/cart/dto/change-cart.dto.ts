import { IsNotEmpty } from 'class-validator'

export class ChangeCartDto {
  @IsNotEmpty({ message: '商品ID不能为空' })
  commodityId?: string

  @IsNotEmpty({ message: '商品数量不能为空' })
  quantity: number
}
