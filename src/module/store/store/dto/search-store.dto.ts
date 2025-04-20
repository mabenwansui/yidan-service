import { IsOptional } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'

export class SearchStoreDto extends PageBaseDto {
  @IsOptional()
  name?: string

  @IsOptional()
  owner?: string

  @IsOptional()
  city?: string

  constructor() {
    super()
    this.curPage = 1
    this.pageSize = 100
  }
}