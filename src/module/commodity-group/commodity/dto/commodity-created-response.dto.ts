import { CreateCommodityDto } from './create-commodity.dto'
export class CommodityCreatedResponseDto extends CreateCommodityDto {
  id: string
  createdAt: Date
  updatedAt: Date
}
