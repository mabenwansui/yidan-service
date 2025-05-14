import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import {
  OrderInterface,
  ORDER_STATUS,
  ORDER_TYPE,
  PAYMENT_TYPE,
  PAYMENT_STATUS
} from '../interface/order.interface'

export type OrderDocument = HydratedDocument<Order>

@Schema({ timestamps: true })
export class Order implements OrderInterface {
  @Prop({ required: true, unique: true })
  orderId: string

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: OrderInterface['store']

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: OrderInterface['user']

  @Prop({ type: String, enum: ORDER_TYPE })
  orderType?: ORDER_TYPE

  @Prop({ required: true, type: String, enum: ORDER_STATUS })
  orderStatus: OrderInterface['orderStatus']

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }], default: [] })
  coupon: OrderInterface['coupon']

  @Prop({ required: true, type: Number })
  originalAmount: number

  @Prop({ type: Number })
  actualAmount?: number // 实际支付金额

  @Prop({ type: String, enum: PAYMENT_TYPE })
  paymentType?: OrderInterface['paymentType'] // 支付类型

  @Prop({ type: String, enum: PAYMENT_STATUS })
  paymentStatus?: OrderInterface['paymentStatus'] // 支付状态

  @Prop()
  table_number?: string // 桌号

  @Prop()
  completedAt?: Date // 完成时间

  @Prop()
  remark?: string // 备注

  @Prop({
    type: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Commodity' },
        quantity: { type: Number }
      }
    ],
    default: []
  })
  commoditys: OrderInterface['commoditys']
}

export const OrderSchema = SchemaFactory.createForClass(Order)
