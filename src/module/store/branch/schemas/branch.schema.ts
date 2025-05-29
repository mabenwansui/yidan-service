import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

export type BranchDocument = HydratedDocument<Branch>
export enum OPEN_STATUS {
  OPEN = 'open',
  CLOSE = 'close'
}

@Schema({ timestamps: true })
export class Branch {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Types.ObjectId

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Commodity' })
  commodity: Types.ObjectId

  @Prop({ type: Number })
  stockConunt?: number // 库存数量

  @Prop({ type: Number })
  soldCount?: number // 已售数量

  @Prop({ type: Number })
  price?: number

  @Prop({ type: Boolean, default: false })
  isOnShelf?: boolean
}

export const BranchSchema = SchemaFactory.createForClass(Branch)
BranchSchema.index({
  storeId: 1,
  commodityId: 1,
  isOnShelf: 1,
  price: 1
})
