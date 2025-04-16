import { IsOptional, IsString } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'
export class SearchAdminDto extends PageBaseDto {
  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsString()
  nickname?: string

  constructor() {
    super()
    this.curPage = 1
    this.pageSize = 1000
  }
} 
