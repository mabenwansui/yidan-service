import { CommodityInterface } from '@/module/commodity/commodity/interface/commodity.interface'

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
  /** 处理中 */
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

export type Commodity = Pick<CommodityInterface, 'category' | 'price'> & { quantity: number }

export interface OrderInterface {
  // 唯一ID，必需
  id?: string
  // 用户ID，必需且唯一
  userId?: string
  // 订单类型，必需
  orderType: ORDER_TYPE
  // 订单状态
  orderStatus?: ORDER_STATUS
  // 总金额，必需
  amount?: number
  // 优惠金额，可选
  discountAmount?: number
  // 实际支付金额，必需
  actualAmount?: number
  // 支付类型，必需
  paymentType: PAYMENT_TYPE
  // 支付状态，可选
  paymentStatus?: PAYMENT_STATUS
  // 桌号，可选
  table_number?: string
  // 联系人，可选
  contact?: string
  // 联系电话，可选
  phone?: string
  // 完成时间，可选
  completedAt?: Date
  // 备注，可选
  remark?: string

  commoditys: Commodity[]
}
