import { IsNotEmpty } from 'class-validator'

export class DeleteCommodityDto {
  /** 商品id */
  @IsNotEmpty({ message: '商品id不能为空' })
  id: string
}
