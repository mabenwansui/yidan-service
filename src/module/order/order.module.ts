import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './schemas/order.schema'
import { OrderController } from './order.controller'
import { OrderService } from './service/order.service'
import { PayService } from './service/pay.service'
import { MessageModule } from '@/module/message/message.module'
import { BranchModule } from '@/module/store/branch/branch.module'
import { AddressModule } from '@/module/address/address.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    BranchModule,
    AddressModule,
    MessageModule
  ],
  controllers: [OrderController],
  providers: [OrderService, PayService],
  exports: [OrderService]
})
export class OrderModule {}
