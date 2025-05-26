import { IsNotEmpty } from 'class-validator'
import { CreateCommodityDto } from './create-commodity.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateCommodityDto extends PartialType(CreateCommodityDto) {
  @IsNotEmpty({ message: '商品id不能为空' })
  id: string
}
