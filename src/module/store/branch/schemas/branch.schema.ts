import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { BranchInterface } from '../interface/branch.interface'
import { Store } from '@/module/store/store/schemas/store.schema'
import { Commodity } from '@/module/commodity/commodity/schemas/commodity.schema'

export type BranchDocument = HydratedDocument<Branch>
export enum OPEN_STATUS {
  OPEN = 'open',
  CLOSE = 'close'
}

@Schema({ timestamps: true })
export class Branch implements Omit<BranchInterface, 'store' | 'commodity'> {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Store

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Commodity' })
  commodity: Commodity

  @Prop({ type: Number })
  stockConunt?: number // 库存数量

  @Prop({ type: Number })
  soldCount?: number // 已售数量

  @Prop({ type: Number })
  price?: number

  @Prop({ type: Boolean })
  isOnShelf: boolean
}

export const BranchSchema = SchemaFactory.createForClass(Branch)
BranchSchema.index({
  // 为 storeId 创建单字段索引，常用于按店铺筛选分支
  storeId: 1,
  // 为 commodityId 创建单字段索引，常用于按商品筛选分支
  commodityId: 1,
  // 为 isOnShelf 和 price 创建复合索引，常用于筛选上架商品并按价格排序
  isOnShelf: 1,
  price: 1
})
