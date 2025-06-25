import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PAGE_SIZE } from '@/common/constants/page'
import { generateOrderId } from '@/common/utils/generateuuid'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import {
  Order,
  ORDER_STATUS,
  ORDER_TYPE,
  PAYMENT_STATUS,
  PAYMENT_TYPE
} from '../schemas/order.schema'
import { BranchPopulate } from '@/module/store/branch/schemas/branch.schema'
import { StorePopulate } from '@/module/store/store/schemas/store.schema'
import { User } from '@/module/user/schemas/user.schema'
import { Coupon } from '@/module/coupon/schemas/coupon.schema'
import { MessageService } from '@/module/message/service/message.service'
import { BranchService } from '@/module/store/branch/branch.service'
import { CreateOrderDto } from '../dto/create-order.dto'
import { SubmitOrderDto } from '../dto/submit-order.dto'
import {
  SearchOrderDto,
  AdminSearchOrderDto,
  AdminSearchArchivedOrderDto
} from '../dto/find-order.dto'

type PopulateType = {
  store: Omit<StorePopulate, 'owner'> & { owner: Omit<User, 'password'> }
  user: Omit<User, 'openidMpWx'>
  coupon: Coupon
  commoditys: BranchPopulate[]
}

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
    const { commoditys, storeId, tableNumber } = createOrderDto
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
      tableNumber,
      originalAmount,
      actualAmount
    }
    const order = await this.orderModel.create(data)
    return { id: order.id }
  }

  async submitOrder(submitOrderDto: SubmitOrderDto, userId: string) {
    const { orderId, commoditys, ...rest } = submitOrderDto
    const data = {
      user: userId,
      orderStatus: ORDER_STATUS.PENDING,
      paymentStatus: PAYMENT_STATUS.UNPAID,
      ...rest
    }
    const order = await this.orderModel.findOneAndUpdate({ _id: orderId }, data)
    if (order) {
      return { id: order.id }
    }
  }

  async updateStage(params: { orderId: string; userId?: string; orderStatus: ORDER_STATUS }) {
    const { orderId, userId, orderStatus } = params
    let data: Partial<Order> = {}
    switch (orderStatus) {
      case ORDER_STATUS.PAID:
        data = {
          paymentStatus: PAYMENT_STATUS.PAID,
          payAt: new Date()
        }
        break
      case ORDER_STATUS.ACCEPTED:
        data = {
          orderStatus: ORDER_STATUS.PROCESSING,
          acceptedAt: new Date()
        }
        break
      case ORDER_STATUS.READY:
        data = {
          orderStatus: ORDER_STATUS.COMPLETED,
          completedAt: new Date()
        }
      case ORDER_STATUS.COMPLETED:
        data = {
          orderStatus: ORDER_STATUS.ARCHIVED,
          completedAt: new Date()
        }
    }
    const doc = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        ...(userId ? { user: userId } : {})
      },
      { ...data }
    )
    if (!doc) {
      throw new HttpException(
        ERROR_MESSAGE.FOUND_ORDER_ERROR,
        ERROR_MESSAGE.FOUND_ORDER_ERROR.status
      )
    }
    return doc
  }

  async search(searchOrderDto: SearchOrderDto) {
    const db = this.orderModel
    const { storeId, orderType, orderStatus, curPage = 1, pageSize = PAGE_SIZE } = searchOrderDto
    const query: any = {}
    if (storeId) {
      query.store = storeId
    }
    if (orderType) {
      query.orderType = orderType
    }
    if (orderStatus) {
      query.orderStatus = orderStatus
    }
    const total = await db.countDocuments(query)
    const data = await this.orderModel
      .find(query)
      .populate<PopulateType>(populate)
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
      .lean()
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: data
    }
  }

  /** 管理后台订单列表 */
  async adminSearch(adminSearchOrderDto: AdminSearchOrderDto) {
    const { orderStatus, ...rest } = adminSearchOrderDto
    return await this.search({
      orderStatus: orderStatus
        ? orderStatus
        : { $nin: [ORDER_STATUS.PENDING, ORDER_STATUS.ARCHIVED] },
      ...rest
    })
  }

  async adminSearchArchived(adminSearchOrderDto: AdminSearchArchivedOrderDto) {
    return await this.search({
      orderStatus: ORDER_STATUS.ARCHIVED,
      ...adminSearchOrderDto
    })
  }

  async findOne(query: any) {
    return await this.orderModel.findOne(query).populate<PopulateType>(populate)
  }

  async updateOrder(): Promise<any> {}
}
