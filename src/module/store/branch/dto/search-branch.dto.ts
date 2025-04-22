import { IsOptional, IsString, IsBoolean } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'

export class SearchBranchDto extends PageBaseDto {
  @IsString()
  @IsOptional()
  storeId?: string

  @IsString()
  @IsOptional()
  commodityId?: string

  @IsBoolean()
  @IsOptional()
  isOnShelf: boolean

  constructor() {
    super()
    this.curPage = 1
    this.pageSize = 20
  }
}
