import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

export type BranchDocument = HydratedDocument<Branch>

@Schema({ timestamps: true })
export class Branch {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Types.ObjectId

  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.ObjectId, ref: 'Commodity' })
  commodity: Types.ObjectId

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId

  @Prop({ type: Number })
  stockConunt?: number // 库存数量

  @Prop({ type: Number })
  soldCount?: number // 已售数量

  @Prop({ type: Number })
  originalPrice?: number // 原价

  @Prop({ type: Number }) // 现价
  price?: number

  @Prop({ type: Boolean, default: false })
  isOnShelf?: boolean // 是否上架
}

export const BranchSchema = SchemaFactory.createForClass(Branch)
BranchSchema.index({ store: 1, category: 1, createdAt: -1 })
BranchSchema.index({ store: 1, isOnShelf: 1, createdAt: -1 })
BranchSchema.index({ store: 1, price: 1, createdAt: -1 })
BranchSchema.index({ store: 1, price: -1, createdAt: -1 })

