import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type CommodityDocument = HydratedDocument<Commodity>

@Schema()
export class Commodity {
  @Prop({ required: true })
  name: string // 名称

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category?: string // 分类

  @Prop({ type: [String], default: [] })
  imgNames?: [string] // 图片

  @Prop()
  originalPrice?: number // 原价

  @Prop({ required: true })
  price: number // 现价

  @Prop()
  description?: string // 描述

  @Prop()
  details?: string // 详情

  @Prop({ type: [String], default: [] })
  tags?: [string] // 标签

  @Prop()
  stockConunt?: number // 库存

  @Prop()
  soldCount?: number // 已售

  @Prop()
  createdAt?: Date // 创建时间

  @Prop()
  updatedAt?: Date // 更新时间
}

export const CommoditySchema = SchemaFactory.createForClass(Commodity)
// CommoditySchema.index(
//   { name: 'text', description: 'text' },
//   { weights: { name: 2, description: 1 } }
// )
