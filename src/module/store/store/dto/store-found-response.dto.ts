import { Expose, Type, Transform } from 'class-transformer'
import { Types } from 'mongoose'
import { OwnerPopulate, StoreInterface } from '../interface/store.interface'
import { PageBaseResponseDto } from '@/common/dto/page-base.dto'

class OwnerPopulateDto implements OwnerPopulate {
  @Expose()
  _id: Types.ObjectId
  @Expose()
  username?: string
  @Expose()
  nickname?: string
  @Expose()
  email?: string
  @Expose()
  phoneNumber?: string
}

export class StoreFoundOneResponseDto implements Omit<StoreInterface, 'owner'> {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  id: string

  @Expose()
  name: string

  @Expose()
  @Type(() => OwnerPopulateDto)
  owner: OwnerPopulateDto[]

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
  details?: string

  @Expose()
  lon: number

  @Expose()
  lat: number
}

export class SearchResponse extends PageBaseResponseDto {
  @Expose()
  @Type(() => StoreFoundOneResponseDto)
  list: StoreFoundOneResponseDto[]
}
