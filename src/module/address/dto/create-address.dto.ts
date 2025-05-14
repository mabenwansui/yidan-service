import { IsBoolean, IsOptional, IsNotEmpty } from 'class-validator'
import { AddressInterface } from '../interface/address.interface'

export class CreateAddressDto implements Omit<AddressInterface, 'userId'>  {
  @IsNotEmpty()
  receiver: string

  @IsNotEmpty()
  city: string

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  address: string

  @IsNotEmpty()
  phoneNumber: string

  @IsBoolean()
  @IsOptional()
  isDefault: boolean
}
