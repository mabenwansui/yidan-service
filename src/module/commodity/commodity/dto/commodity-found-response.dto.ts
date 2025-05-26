import { OmitType } from '@nestjs/mapped-types'
import { Expose, Transform, Type } from 'class-transformer'
import { toId } from '@/common/utils/transform'
import { PageBaseResponseDto } from '@/common/dto/page-base.dto'
import { Commodity } from '../schemas/commodity.schema'
import { CategoryFoundOneResponse } from '@/module/commodity/category/dto/category-found-response.dto'

export class CommodityFoundOneResponseDto extends OmitType(Commodity, ['category']) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  name: string

  @Expose()
  tags?: [string]

  @Expose()
  originalPrice?: number

  @Expose()
  description?: string

  @Expose()
  @Type(() => CategoryFoundOneResponse)
  category?: CategoryFoundOneResponse

  @Expose()
  details?: string

  @Expose()
  imgNames?: [string]

  @Expose()
  coverImageUrl?: string

  @Expose()
  stockConunt?: number

  @Expose()
  soldCount?: number

  @Expose()
  createdAt?: Date

  @Expose()
  updatedAt?: Date
}

export class CommoditySearchResponseDto extends PageBaseResponseDto {
  @Expose()
  @Type(() => CommodityFoundOneResponseDto)
  list: CommodityFoundOneResponseDto[]
}
