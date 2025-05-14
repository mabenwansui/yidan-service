import { IsNotEmpty } from 'class-validator'
import { CreateAddressDto } from './create-address.dto'

export class UpdateAddressDto extends CreateAddressDto  {
  @IsNotEmpty()
  id: string
}
