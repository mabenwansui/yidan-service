import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator'
import { CreateAddressDto } from './create-address.dto'

export class UpdateAddressDto extends PartialType(CreateAddressDto)  {
  @IsNotEmpty()
  id: string
}
