import { Expose, Type } from 'class-transformer'
import { CreateAddressDto } from './create-address.dto'

class AddressItem extends CreateAddressDto {
  @Expose()
  id?: string
}

export class SearchAddressResponseDto {
  @Expose()
  list: AddressItem[]
}
