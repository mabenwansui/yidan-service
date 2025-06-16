import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import {
  Order,
  ORDER_STATUS,
  ORDER_TYPE,
  PAYMENT_STATUS,
  PAYMENT_TYPE
} from '../schemas/order.schema'
import { OrderService } from './order.service'
import { MessageService } from '@/module/message/service/message.service'
import { PayDto } from '../dto/pay.dto'

@Injectable()
export class PayService {
  constructor(
    private readonly orderService: OrderService,
    private readonly messageService: MessageService
  ) {}

  async pay(payDto: PayDto, userId: string) {
    const doc = await this.orderService.updateStage({
      userId,
      ...payDto,
      orderStatus: ORDER_STATUS.PAID
    })
    await this.messageService.createPayMessage(doc.store._id.toString(), payDto.orderId)
    return {}
  }
}
