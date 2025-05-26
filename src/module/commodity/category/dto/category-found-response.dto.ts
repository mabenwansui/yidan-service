import { Expose, Transform, Type } from 'class-transformer'
import { toId } from '@/common/utils/transform'
import { OmitType } from '@nestjs/mapped-types'
import { Category } from '../schemas/category.schema'

export class CategoryFoundOneResponse extends OmitType(Category, ['childrenIds']) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  title: string

  @Expose()
  parentId?: string

  @Expose()
  level?: number

  @Expose()
  @Type(() => CategoryFoundOneResponse)
  children?: Array<CategoryFoundOneResponse>
}

export class CategorySearchResponseDto {
  @Expose()
  @Type(() => CategoryFoundOneResponse)
  list: Array<CategoryFoundOneResponse>
}
