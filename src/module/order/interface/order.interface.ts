import { CommodityInterface } from '@/module/commodity/commodity/interface/commodity.interface'
import { UserInterface } from '@/module/user/interface/user.interface'
import { CouponInterface } from '@/module/coupon/interface/coupon.interface'
import { StoreInterface } from '@/module/store/store/interface/store.interface'
import { Types } from 'mongoose'

export enum ORDER_TYPE {
  /** 堂食 */
  DINE_IN = 'dine-in',
  /** 外卖 */
  TAKE_OUT = 'takeout',
  /** 配送 */
  DELIVERY = 'delivery'
}

export enum ORDER_STATUS {
  /** 待支付 */
  PENDING = 'pending',
  /** 处理中, 出餐中 */
  PROCESSING = 'processing',
  /** 待取餐 */
  READY = 'ready',
  /** 已取消 */
  CANCELLED = 'cancelled',
  /** 申请退款 */
  REFUND_REQUESTED = 'refund_requested',
  /** 退款中 */
  REFUNDING = 'refunding',
  /** 退款失败 */
  REFUND_FAILED = 'refund_failed',
  /** 退款完成 */
  REFUNDED = 'refunded',
  /** 已完成 */
  COMPLETED = 'completed'
}

export enum PAYMENT_TYPE {
  /** 微信支付 */
  WECHAT = 'wechat',
  /** 支付宝支付 */
  ALIPAY = 'alipay'
}

export enum PAYMENT_STATUS {
  /** 未支付 */
  UNPAID = 'unpaid',
  /** 已支付 */
  PAID = 'paid',
  /** 支付失败 */
  FAILED = 'failed'
}

export type storePopulate = StoreInterface
export type userPopulate = Pick<UserInterface, 'nickname' | 'phoneNumber'>
export type couponPopulate = CouponInterface
export type commodityPopulate = Pick<
  CommodityInterface,
  'name' | 'category' | 'originalPrice' | 'price' | 'coverImageUrl'
> & {
  quantity: number
}

export interface OrderInterface {
  /** 展示给用户的订单ID, 未使用主键, 避免ID过长或安全问题 */
  orderId?: string

  /** 用户信息 */
  user?: Types.ObjectId

  /** 店铺 */
  store: Types.ObjectId

  /** 订单类型 */
  orderType?: ORDER_TYPE

  /** 订单状态 */
  orderStatus?: ORDER_STATUS

  /** 优惠券 */
  coupon?: Types.ObjectId[]

  /** 原始总金额(购物车所有商品的总价) */
  originalAmount: number

  /** 实际支付金额 */
  actualAmount?: number

  /** 支付类型 */
  paymentType?: PAYMENT_TYPE

  /** 支付状态 */
  paymentStatus?: PAYMENT_STATUS

  /** 桌号 */
  table_number?: string

  /** 完成时间 */
  completedAt?: Date

  /** 备注 */
  remark?: string

  /** 商品信息 */
  commoditys: { id: Types.ObjectId; quantity: number }[]
}
