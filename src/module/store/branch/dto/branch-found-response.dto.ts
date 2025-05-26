import { Expose, Type, Transform } from 'class-transformer'
import { OmitType } from '@nestjs/mapped-types'
import { toId } from '@/common/utils/transform'
import { PageBaseResponseDto } from '@/common/dto/page-base.dto'
import { StoreFoundOneResponseDto } from '@/module/store/store/dto/store-found-response.dto'
import { Commodity } from '@/module/commodity/commodity/schemas/commodity.schema'
import { Branch } from '../schemas/branch.schema'

export class BranchFoundOneResponseDto extends OmitType(Branch, ['store', 'commodity']) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  @Type(() => StoreFoundOneResponseDto)
  store: StoreFoundOneResponseDto

  @Expose()
  commodity: Commodity
}


export class BranchSearchedResponseDto extends PageBaseResponseDto {
  @Expose()
  @Type(() => BranchFoundOneResponseDto)
  list: BranchFoundOneResponseDto[]
}
