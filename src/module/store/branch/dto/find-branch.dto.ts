import { IsOptional, IsBoolean } from 'class-validator'
import { PickType, IntersectionType } from '@nestjs/mapped-types'
import { PageBaseDto } from '@/common/dto/page-base.dto'
import { Branch } from '../schemas/branch.schema'

export class SearchBranchDto extends IntersectionType(PageBaseDto, PickType(Branch, ['isOnShelf'])) {
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
