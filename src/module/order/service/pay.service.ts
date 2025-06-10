import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  Order,
  ORDER_STATUS,
  ORDER_TYPE,
  PAYMENT_STATUS,
  PAYMENT_TYPE
} from '../schemas/order.schema'
import { OrderService } from './order.service'
import { MessageService } from '@/module/message/message.service'
import { PayDto } from '../dto/pay.dto'

@Injectable()
export class PayService {
  constructor(
    private readonly orderService: OrderService,
    private readonly messageService: MessageService,
  ) {}

  async pay(payDto: PayDto, userId: string) {
    Promise.all([
      await this.orderService.updateStage({
        userId,
        ...payDto,
      }),
      // await this.messageService.sendTemplateMessage({
        
      // })
    ])
  }
}