import { OmitType, IntersectionType } from '@nestjs/mapped-types'
import { IsBoolean, IsOptional, IsNotEmpty } from 'class-validator'
import { AddressLocationBaseDto } from '@/common/dto/address-base.dto'
import { Address } from '../schemas/address.schema'

export class CreateAddressDto extends IntersectionType(
  AddressLocationBaseDto,
  OmitType(Address, ['userId'])
) {
  @IsNotEmpty()
  contactName: string

  @IsNotEmpty()
  sex: Address['sex']

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  phoneNumber: string

  @IsBoolean()
  @IsOptional()
  isDefault: boolean
}
