import { Expose, Type } from 'class-transformer'
import { FoundAddressResponseDto } from './found-address-response.dto'

export class SearchAddressResponseDto {
  @Expose()
  @Type(() => FoundAddressResponseDto)
  list: FoundAddressResponseDto[]
}
