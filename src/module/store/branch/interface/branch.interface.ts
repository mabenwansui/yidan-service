import { CommodityInterface } from '@/module/commodity/commodity/interface/commodity.interface'
import { StoreInterface } from '@/module/store/store/interface/store.interface'

export interface BranchInterface {
  store: StoreInterface
  commodity: CommodityInterface
  stockConunt?: number // 库存
  soldCount?: number // 已售
  price?: number // 现价  
  isOnShelf?: boolean // 上架
}