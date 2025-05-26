import { IsNotEmpty, IsOptional } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'
import { IntersectionType } from '@nestjs/mapped-types'

export class FindOneCommodityDto {
  @IsOptional()
  id?: string

  @IsOptional()
  name?: string

  @IsOptional()
  categoryId?: string
}

export class SearchCommodityDto extends IntersectionType(FindOneCommodityDto, PageBaseDto) {
  constructor() {
    super()
    this.curPage = 1
    this.pageSize = 20
  }
}