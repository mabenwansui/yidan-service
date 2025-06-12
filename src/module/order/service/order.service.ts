import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { generateOrderId } from '@/common/utils/generateuuid'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import {
  Order,
  ORDER_STATUS,
  ORDER_TYPE,
  PAYMENT_STATUS,
  PAYMENT_TYPE
} from '../schemas/order.schema'
import { CreateOrderDto } from '../dto/create-order.dto'
import { SubmitOrderDto } from '../dto/submit-order.dto'
import { SearchOrderDto } from '../dto/find-order.dto'
import { MessageService } from '@/module/message/message.service'
import { BranchService } from '@/module/store/branch/branch.service'

const populate = [
  { path: 'store', populate: { path: 'owner', select: '-password' } },
  { path: 'user', select: '-openidMpWx' },
  { path: 'coupon' },
  {
    path: 'commoditys',
    populate: {
      path: 'branch',
      select: '-store -category',
      populate: { path: 'commodity', populate: { path: 'category' } }
    }
  }
]

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    private readonly messageService: MessageService,
    private readonly branchService: BranchService
  ) {}

  private async calculateAmount(commoditys: CreateOrderDto['commoditys']) {
    const branchDB = this.branchService.getModel()
    const branches = await branchDB
      .find({ _id: { $in: commoditys.map((item) => item.branchId) } })
      .lean()
    let originalAmount = 0
    let actualAmount = 0
    commoditys.forEach((item) => {
      const branch = branches.find((branch) => branch._id.toString() === (item.branchId as string))
      originalAmount += branch.originalPrice * item.quantity
      actualAmount += branch.price * item.quantity
    })
    return { originalAmount, actualAmount }
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<any> {
    const { commoditys, storeId, table_number } = createOrderDto
    const { originalAmount, actualAmount } = await this.calculateAmount(commoditys)
    const data = {
      orderId: generateOrderId(),
      user: userId,
      store: storeId,
      orderStatus: ORDER_STATUS.PENDING,
      paymentStatus: PAYMENT_STATUS.UNPAID,
      commoditys: commoditys.map((item) => {
        const { branchId, ...rest } = item
        return { branch: branchId, ...rest }
      }),
      table_number,
      originalAmount,
      actualAmount
    }
    const order = await this.orderModel.create(data)
    return { id: order.id }
  }

  async submitOrder(submitOrderDto: SubmitOrderDto, userId: string) {
    const { orderId, commoditys, ...rest } = submitOrderDto
    const data = {
      _id: orderId,
      user: userId,
      orderStatus: ORDER_STATUS.PENDING,
      paymentStatus: PAYMENT_STATUS.UNPAID,
      completedAt: new Date(),
      ...rest
    }
    const order = await this.orderModel.findOneAndUpdate(data)
    if (order) {
      // this.messageService.createOrderSystemMessage(order)
      return { id: order.id }
    }
  }

  async updateStage(params: { orderId: string; userId: string; orderStatus: ORDER_STATUS }) {
    const { orderId, userId, orderStatus } = params
    let data: Partial<Order> = {}
    switch (orderStatus) {
      case ORDER_STATUS['PAID']:
        data = { paymentStatus: PAYMENT_STATUS.PAID }
        break
    }
    const doc = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        user: userId
      },
      {
        orderStatus,
        ...data
      }
    )
    if (!doc) {
      throw new HttpException(
        ERROR_MESSAGE.FOUND_ORDER_ERROR,
        ERROR_MESSAGE.FOUND_ORDER_ERROR.status
      )
    }
    return doc
  }

  async getOrderList(query: SearchOrderDto) {
    return await this.orderModel.find(query)
  }

  async findOne(query: any) {
    return await this.orderModel.findOne(query).populate<any>(populate)
  }

  async updateOrder(): Promise<any> {}
}
