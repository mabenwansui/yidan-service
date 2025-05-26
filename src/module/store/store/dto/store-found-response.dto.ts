import { Expose, Type, Transform } from 'class-transformer'
import { OmitType } from '@nestjs/mapped-types'
import { PageBaseResponseDto } from '@/common/dto/page-base.dto'
import { toId } from '@/common/utils/transform'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { Store } from '../schemas/store.schema'

export class StoreFoundOneResponseDto extends OmitType(Store, ['owner']) {
  @Expose()
  @Transform(toId)
  id: string

  @Expose()
  name: string

  @Expose()
  @Type(() => UserFoundOneResponseDto)
  owner: UserFoundOneResponseDto[]

  @Expose()
  imgNames?: string[]

  @Expose()
  coverImageUrl?: string

  @Expose()
  description?: string

  @Expose()
  city: string

  @Expose()
  poiName: string

  @Expose()
  poiAddress: string

  @Expose()
  details: string

  @Expose()
  lon: number

  @Expose()
  lat: number
}

export class StoreSearchResponseDto extends PageBaseResponseDto {
  @Expose()
  @Type(() => StoreFoundOneResponseDto)
  list: StoreFoundOneResponseDto[]
}
