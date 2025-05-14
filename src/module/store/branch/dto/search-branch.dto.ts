import { IsOptional, IsBoolean } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'

export class SearchBranchDto extends PageBaseDto {
  @IsOptional()
  storeId?: string

  @IsOptional()
  commodityId?: string

  @IsBoolean()
  @IsOptional()
  isOnShelf: boolean

  @IsOptional()
  categoryId?: string

  constructor() {
    super()
    this.curPage = 1
    this.pageSize = 20
  }
}
