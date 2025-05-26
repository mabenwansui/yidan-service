import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

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

export type OrderDocument = HydratedDocument<Order>

class OrderCommoditysSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Commodity' })
  commodity: Types.ObjectId
  @Prop({ required: true, type: Number, min: 1 })
  quantity: number
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, unique: true })
  orderId: string

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Types.ObjectId

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId

  @Prop({ type: String, enum: ORDER_TYPE })
  orderType?: ORDER_TYPE

  @Prop({ required: true, type: String, enum: ORDER_STATUS })
  orderStatus: ORDER_STATUS

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }], default: [] })
  coupon: Types.ObjectId[]

  @Prop({ required: true, type: Number })
  originalAmount: number

  @Prop({ type: Number })
  actualAmount?: number // 实际支付金额

  @Prop({ type: String, enum: PAYMENT_TYPE })
  paymentType?: PAYMENT_TYPE // 支付类型

  @Prop({ type: String, enum: PAYMENT_STATUS })
  paymentStatus?: PAYMENT_STATUS // 支付状态

  @Prop()
  table_number?: string // 桌号

  @Prop()
  completedAt?: Date // 完成时间

  @Prop()
  remark?: string // 备注

  @Prop({ type: [OrderCommoditysSchema], default: [] })
  commoditys: OrderCommoditysSchema[]
}

export const OrderSchema = SchemaFactory.createForClass(Order)
