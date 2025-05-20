import { IsBoolean, IsOptional, IsNotEmpty } from 'class-validator'
import { AddressInterface } from '../interface/address.interface'
import { AddressDto } from '@/common/dto/address.dto'


export class CreateAddressDto extends AddressDto {
  @IsNotEmpty()
  contactName: string

  @IsNotEmpty()
  sex: AddressInterface['sex']

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  phoneNumber: string

  @IsBoolean()
  @IsOptional()
  isDefault: boolean
}
