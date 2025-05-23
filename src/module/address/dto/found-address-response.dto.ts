import { Expose } from 'class-transformer'
import { AddressResponseDto } from '@/common/dto/address.dto'
import { SexType } from '@/common/types/user.interface'

export class FoundAddressResponseDto extends AddressResponseDto {
  @Expose()
  id?: string
  @Expose()
  contactName: string
  @Expose()
  sex: SexType
  @Expose()
  title: string
  @Expose()
  phoneNumber: string
  @Expose()
  isDefault: boolean
}
