import { CommodityInterface } from '../interface/commodity.interface'


export interface CommodityItem extends CommodityInterface {
  commodityId: string
}

export class CommoditySearchResponseDto {
  list: CommodityInterface[]
  pageSize: number
  curPage: number
  total: number
}
