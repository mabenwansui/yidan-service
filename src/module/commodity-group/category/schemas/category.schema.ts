import { HttpException } from '@nestjs/common'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'

export type CommodityCategoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
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
CategorySchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
  const doc = await this.model.findOne(this.getQuery())
  if (doc && doc.level === 0) {
    return next(
      new HttpException(
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR,
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR.status
      )
    )
  }
  return next()
})
