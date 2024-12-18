import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Commodity, CommoditySchema } from './schemas/commodity.schema'
import { CommodityController } from './commodity.controller'
import { CommodityService } from './commodity.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Commodity.name, schema: CommoditySchema }])],
  controllers: [CommodityController],
  providers: [CommodityService],
})
export class CommodityModule {}
