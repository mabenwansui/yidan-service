import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CommodityCategoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  name: string // 名称

  @Prop({ required: true })
  id: string // 商品ID
}

export const CategorySchema = SchemaFactory.createForClass(Category)
