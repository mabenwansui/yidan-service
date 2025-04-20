import { IsOptional, IsString } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'
import { ROLE } from '@/common/constants/role'

export class SearchDtoBase extends PageBaseDto {
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

export class SearchAdminDto extends SearchDtoBase {
  @IsOptional()
  role?: ROLE[]
}

export class SearchStaffDto extends SearchDtoBase {}
