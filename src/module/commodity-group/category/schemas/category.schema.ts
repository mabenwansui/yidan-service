import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CommodityCategoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
  @Prop({ required: true })
  id: string // 分类ID

  @Prop({ required: true, unique: true })
  title: string // 名称

  @Prop()
  parentId?: string // 父级

  @Prop()
  childrenIds?: Array<string> // 子级id、通过数组排序

  @Prop()
  level?: number // 层级
}

export const CategorySchema = SchemaFactory.createForClass(Category)
