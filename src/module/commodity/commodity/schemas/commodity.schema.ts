import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { CommodityInterface } from '../interface/commodity.interface'

export type CommodityDocument = HydratedDocument<Commodity>

@Schema({ timestamps: true })
export class Commodity implements Omit<CommodityInterface, 'categoryId' | 'category'> {
  @Prop({ required: true })
  name: string // 名称

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category?: CommodityInterface['category'] // 分类

  @Prop({ type: [String], default: [] })
  imgNames?: [string] // 图片

  @Prop()
  coverImageUrl?: string // 封面图

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
}

export const CommoditySchema = SchemaFactory.createForClass(Commodity)
// CommoditySchema.index(
//   { name: 'text', description: 'text' },
//   { weights: { name: 2, description: 1 } }
// )
