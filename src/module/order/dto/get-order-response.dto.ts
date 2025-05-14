import { OrderInterface, storePopulate, userPopulate, couponPopulate, commodityPopulate } from '../interface/order.interface'

export class getOrderResponseDto implements Omit<OrderInterface, 'store' | 'user' | 'coupon' | 'commoditys'> {
  orderId?: string
  user: userPopulate
  store: storePopulate
  orderType: OrderInterface['orderType']
  orderStatus?: OrderInterface['orderStatus']
  coupon?: couponPopulate[]
  originalAmount: number
  actualAmount?: number
  paymentType: OrderInterface['paymentType']
  paymentStatus?: OrderInterface['paymentStatus']
  table_number?: string
  completedAt?: Date
  remark?: string
  commoditys: commodityPopulate[]
}