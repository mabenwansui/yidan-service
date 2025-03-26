import { Module } from '@nestjs/common'
import { CommodityModule } from './commodity/commodity.module'
import { CategoryModule } from './category/category.module'

@Module({
  imports: [CommodityModule, CategoryModule],
  exports: [CommodityModule, CategoryModule]
})
export class CommodityGroupModule {}
