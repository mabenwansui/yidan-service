import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Commodity, CommoditySchema } from './schemas/commodity.schema'
import { CommodityController } from './commodity.controller'
import { CommodityService } from './commodity.service'
import { AuthModule } from '@/module/auth/auth.module'


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Commodity.name, schema: CommoditySchema }]),
    AuthModule
  ],
  controllers: [CommodityController],
  providers: [CommodityService],
})
export class CommodityModule {}
