import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { OrderInterface, ORDER_STATUS, ORDER_TYPE, PAYMENT_TYPE, PAYMENT_STATUS, Commodity } from '../interface/order.interface'

export type OrderDocument = HydratedDocument<Order>

@Schema({ timestamps: true })
export class Order implements OrderInterface {
  @Prop({ required: true, unique: true })
  id: string

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string

  @Prop({ type: String, enum: ORDER_TYPE, required: true })
  orderType: ORDER_TYPE

  @Prop({ type: String, enum: ORDER_STATUS, required: true })
  orderStatus: ORDER_STATUS

  @Prop({ required: true })
  amount: number // 总金额

  @Prop({ required: true })
  discountAmount?: number // 优惠金额

  @Prop({ required: true })
  actualAmount: number // 实际支付金额

  @Prop({ type: String, enum: PAYMENT_TYPE, required: true })
  paymentType: PAYMENT_TYPE // 支付类型

  @Prop({ type: String, enum: PAYMENT_TYPE, required: true })
  paymentStatus?: PAYMENT_STATUS // 支付状态

  @Prop()
  table_number?: string // 桌号

  @Prop()
  completedAt?: Date // 完成时间

  @Prop()
  remark?: string // 备注
  
  @Prop({required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commodity' }] })
  commoditys: Commodity[]
}

export const OrderSchema = SchemaFactory.createForClass(Order)
