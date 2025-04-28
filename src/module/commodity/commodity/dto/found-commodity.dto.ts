import { IsNotEmpty } from 'class-validator'

export class FoundCommodityDto {
  @IsNotEmpty({ message: '商品id不能为空' })
  id: string
}
