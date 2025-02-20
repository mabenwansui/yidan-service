import { CreateCommodityDto } from './createCommodity.dto'
export class CommodityCreatedResponseDto extends CreateCommodityDto {
  id: string
  createdAt: Date
  updatedAt: Date
}
