import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

export type CommodityDocument = HydratedDocument<Commodity>

@Schema({ timestamps: true })
export class Commodity {
  @Prop({ required: true })
  name: string // 名称

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId // 分类

  @Prop({ type: [String], default: [] })
  imgNames?: [string] // 图片

  @Prop()
  coverImageUrl?: string // 封面图

  @Prop()
  description?: string // 描述

  @Prop()
  details?: string // 详情

  @Prop({ type: [String], default: [] })
  tags?: [string] // 标签
}

export const CommoditySchema = SchemaFactory.createForClass(Commodity)
CommoditySchema.index({ name: 'text', createdAt: -1 })
CommoditySchema.index({ category: 1, createdAt: -1 })
  

