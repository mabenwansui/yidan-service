import { IsNotEmpty, IsOptional } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'

export class FindOneCommodityDto {
  @IsOptional()
  id?: string

  @IsOptional()
  name?: string
}

export class SearchCommodityDto extends PageBaseDto {
  @IsOptional()
  id?: string

  @IsOptional()
  name?: string

  @IsOptional()
  categoryId?: string  
  constructor() {
    super()
    this.curPage = 1
    this.pageSize = 20
  }
}