import { IsNotEmpty } from 'class-validator'
import { CreateCommodityDto } from './createCommodity.dto'

export class UpdateCommodityDto extends CreateCommodityDto {
  /** 商品id */
  @IsNotEmpty({ message: '商品id不能为空' })
  id: string
}
