import { Expose, Type, Transform } from 'class-transformer'
import { OmitType } from '@nestjs/mapped-types'
import { toId } from '@/common/utils/transform'
import { PageBaseResponseDto } from '@/common/dto/page-base.dto'
// import { StoreFoundOneResponseDto } from '@/module/store/store/dto/store-found-response.dto'
import { CommodityFoundOneResponseDto } from '@/module/commodity/commodity/dto/commodity-found-response.dto'
import { Branch } from '../schemas/branch.schema'

export class BranchFoundOneByStoreResponseDto extends OmitType(Branch, ['store', 'commodity']) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  @Type(() => CommodityFoundOneResponseDto)
  commodity: CommodityFoundOneResponseDto

  @Expose()
  stockConunt?: number

  @Expose()
  soldCount?: number

  @Expose()
  originalPrice?: number

  @Expose()
  price?: number

  @Expose()
  isOnShelf?: boolean
}

export class BranchSearchedByStoreResponseDto extends PageBaseResponseDto {
  @Expose()
  @Type(() => BranchFoundOneByStoreResponseDto)
  list: BranchFoundOneByStoreResponseDto[]
}
