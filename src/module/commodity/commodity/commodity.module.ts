import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryModule } from '@/module/commodity/category/category.module'
import { Commodity, CommoditySchema } from './schemas/commodity.schema'
import { CommodityController } from './commodity.controller'
import { CommodityService } from './commodity.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Commodity.name, schema: CommoditySchema }]),
    CategoryModule
  ],
  controllers: [CommodityController],
  providers: [CommodityService],
  exports: [CommodityService]
})
export class CommodityModule {}
