import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { WithMongoId } from '@/common/types/mongo.interface'
import { CommodityPopulate } from '@/module/commodity/commodity/schemas/commodity.schema'
import { CategoryPopulate } from '@/module/commodity/category/schemas/category.schema'
import { StorePopulate } from '@/module/store/store/schemas/store.schema'

export type BranchDocument = HydratedDocument<Branch>

export type BranchPopulate = WithMongoId<Omit<Branch, 'commodity' | 'category' | 'store'> & {
  commodity: CommodityPopulate
  category: CategoryPopulate
  store: StorePopulate
}>

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

