import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Coupon, CouponSchema } from './schemas/coupon.schema'
import { OrderController } from './coupon.controller'
import { OrderService } from './coupon.service'
import { MessageModule } from '@/module/message/message.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]), 
    MessageModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class CouponModule {}
