export interface BranchInterface {
  storeId: string
  commodityId: string
  stockConunt?: number // 库存
  soldCount?: number // 已售
  price?: number // 现价  
  isOnShelf?: boolean // 上架
}