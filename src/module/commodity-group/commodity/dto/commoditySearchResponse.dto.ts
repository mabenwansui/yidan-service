import { Commodity } from '../schemas/commodity.schema'

export class CommoditySearchResponseDto {
  list: Commodity[]
  pageSize: number
  curPage: number
  total: number
}
