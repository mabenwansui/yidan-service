import { Expose } from 'class-transformer'

export class CreateAddressResponseDto {
  @Expose()
  id: string
}