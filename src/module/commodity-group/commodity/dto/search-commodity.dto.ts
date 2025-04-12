import { IsNumber, IsOptional } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'

export class SearchCommodityDto extends PageBaseDto {
  @IsOptional()
  search?: string // 搜索关键字

  @IsOptional()
  category?: string // 分类

  constructor() {
    super()
    this.curPage = 1
    this.pageSize = 20
  }
}
