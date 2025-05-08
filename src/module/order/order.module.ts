import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './schemas/order.schema'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { MessageModule } from '@/module/message/message.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), 
    MessageModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
