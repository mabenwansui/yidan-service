import { Module } from '@nestjs/common'
import { CommodityModule as CommodityModuleChild } from './commodity/commodity.module'
import { CategoryModule } from './category/category.module'

@Module({
  imports: [CommodityModuleChild, CategoryModule],
  exports: [CommodityModuleChild, CategoryModule]
})
export class CommodityModule {}
