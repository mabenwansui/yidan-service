import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { generateUuid } from '@/common/utils/generateuuid'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { ORDER_TYPE } from './interface/order.interface'
import { Order } from './schemas/order.schema'
import { CreateOrderDto } from './dto/create-order.dto'
import { MessageService } from '@/module/message/message.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    private readonly messageService: MessageService
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<any> {
    const { remark } = createOrderDto
    const dto = {
      id: generateUuid(),
      remark
    }
    const data = {
      userId,
      orderType: ORDER_TYPE.DINE_IN
    }
    const order = await this.orderModel.create(dto)
    return { id: order.id }
  }

  async updateOrder(): Promise<any> {
    // this.messageService.emitNewMessage({
    //   title: '我是标题',
    //   message: '这是内容'
    // })
  }

  // async getOrderInfo(orderId: string): Promise<OrderFoundOneResponseDto> {
  //   const doc = await this.orderModel.findOne({ id: orderId });
  //   if (!doc) {
  //     throw new HttpException(ERROR_MESSAGE.ORDER_NOT_FOUND, ERROR_MESSAGE.ORDER_NOT_FOUND.status);
  //   }
  //   return doc;
  // }

  // async _findOne(query: Object) {
  //   return await this.orderModel.findOne(query);
  // }
}
