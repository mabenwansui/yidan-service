import { CommodityInterface } from '../interface/commodity.interface'

export class CommoditySearchResponseDto {
  list: CommodityInterface[]
  pageSize: number
  curPage: number
  total: number
}
