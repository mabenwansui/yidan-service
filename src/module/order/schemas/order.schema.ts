import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { CartItem, CartPopulate } from '@/module/cart/schemas/cart.schema'
import { StorePopulate } from '@/module/store/store/schemas/store.schema'
import { User } from '@/module/user/schemas/user.schema'
import { Coupon } from '@/module/coupon/schemas/coupon.schema'

export type OrderPopulate = Omit<Order, 'store' | 'commoditys'> & {
  store: StorePopulate
  user: User
  coupon: Coupon[]
  commoditys: CartPopulate[]
}

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
  /** 用户已支付，等待商家接单 */
  PAID = 'paid',
  /** 商家已确认并开始准备 */
  ACCEPTED = 'accepted',
  /** 处理中, 出餐中 */
  PROCESSING = 'processing',
  /** 餐已备好, 待取 */
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
  COMPLETED = 'completed',
  /** 已归档 */
  ARCHIVED = 'archived'
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
  tableNumber?: string // 桌号

  @Prop()
  remark?: string // 备注

  @Prop({ type: [CartItem], default: [] })
  commoditys: CartItem[]
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address?: Types.ObjectId

  @Prop({ type: Date })
  payAt: Date

  @Prop({ type: Date })
  acceptedAt?: Date // 接单时间

  @Prop({ type: Date })
  completedAt?: Date // 完成时间

  @Prop({ type: Date })
  archivedAt?: Date // 归档时间
}

export const OrderSchema = SchemaFactory.createForClass(Order)
