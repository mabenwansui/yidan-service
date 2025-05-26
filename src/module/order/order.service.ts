import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { generateOrderId } from '@/common/utils/generateuuid'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { Order, ORDER_STATUS, ORDER_TYPE, PAYMENT_STATUS, PAYMENT_TYPE } from './schemas/order.schema'
import { CreateOrderDto } from './dto/create-order.dto'
import { SubmitOrderDto } from './dto/submit-order.dto'
import { SearchOrderDto } from './dto/search-order.dto'
import { OrderFoundOneResponseDto } from './dto/order-found-response.dto'
import { MessageService } from '@/module/message/message.service'
import { CommodityService } from '@/module/commodity/commodity/commodity.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    private readonly messageService: MessageService,
    private readonly commodityService: CommodityService
  ) {}

  private async formatCommodity(commodity: CreateOrderDto['commoditys']) {
    const doc = await this.commodityService._find({
      _id: { $in: commodity.map((item) => item.commodityId) }
    })
    return doc.map((item, index) => ({
      name: item.name,
      category: item.category,
      quantity: commodity[index].quantity
    }))
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<any> {
    const { commoditys, storeId, table_number } = createOrderDto
    const _commoditys = await this.formatCommodity(commoditys)
    const data = {
      orderId: generateOrderId(),
      user: userId,
      store: storeId,
      orderStatus: ORDER_STATUS.PENDING,
      paymentStatus: PAYMENT_STATUS.UNPAID,
      commoditys: commoditys.map((item)=> ({
        id: item.commodityId,
        quantity: item.quantity
      })),
      // originalAmount: _commoditys.reduce((sum, item) => sum + item.price * item.quantity, 0)      
    }
    const order = await this.orderModel.create(data)
    return { id: order.id }
  }

  async submitOrder(submitOrderDto: SubmitOrderDto, userId: string) {
    const { orderId, commoditys, ...rest } = submitOrderDto
    const _commoditys = await this.formatCommodity(commoditys)
    const data = {
      orderStatus: ORDER_STATUS.PROCESSING,
      paymentStatus: PAYMENT_STATUS.UNPAID,
      // originalAmount: _commoditys.reduce((sum, item) => sum + item.price * item.quantity, 0),
      // actualAmount: _commoditys.reduce((sum, item) => sum + item.price * item.quantity, 0),
      ...rest
    }
    const order = await this.orderModel.findByIdAndUpdate(orderId, data)
    if (order) {
      this.messageService.createOrderSystemMessage(order)
      return { id: order.id }
    }
  }

  async getOrderList(query: SearchOrderDto) {
    return await this.orderModel.find(query)
  }

  async getOrder(orderId: string): Promise<OrderFoundOneResponseDto> {
    return (await this.orderModel.findById(orderId)).populate({
      path: 'user',
      select: 'nickname phoneNumber'
    })
  }

  async updateOrder(): Promise<any> {}
}
