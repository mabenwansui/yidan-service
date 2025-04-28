import { IsOptional } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'

export class SearchCommodityDto extends PageBaseDto {
  @IsOptional()
  id?: string

  @IsOptional()
  name?: string

  @IsOptional()
  categoryId?: string // 分类

  constructor() {
    super()
    this.curPage = 1
    this.pageSize = 20
  }
}
