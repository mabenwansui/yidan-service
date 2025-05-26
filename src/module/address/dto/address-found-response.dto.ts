import { Expose, Type } from 'class-transformer'
import { AddressResponseDto } from '@/common/dto/address-base.dto'
import { Address } from '../schemas/address.schema'

export class AddressFoundOneResponseDto extends AddressResponseDto {
  @Expose()
  id?: string
  @Expose()
  contactName: string
  @Expose()
  sex: Address['sex']
  @Expose()
  title: string
  @Expose()
  phoneNumber: string
  @Expose()
  isDefault: boolean
}

export class AddressSearchResponseDto {
  @Expose()
  @Type(() => AddressFoundOneResponseDto)
  list: AddressFoundOneResponseDto[]
}