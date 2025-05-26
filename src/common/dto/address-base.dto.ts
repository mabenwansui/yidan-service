import { IsNotEmpty, IsNumber, IsOptional, IsLatitude, IsLongitude } from 'class-validator'
import { Expose } from 'class-transformer'
import { AddressSchemas } from '@/common/schemas/address.schemas'
import { OmitType } from '@nestjs/mapped-types'

export class AddressLocationBaseDto extends OmitType(AddressSchemas, ['location']) {
  @IsOptional()
  city?: string

  @IsNotEmpty()
  poiName: string

  @IsNotEmpty()
  poiAddress: string

  @IsNotEmpty()
  details: string

  @IsLongitude()
  @IsNotEmpty()
  lon: number

  @IsLatitude()
  @IsNotEmpty()
  lat: number
}

export class AddressResponseDto extends OmitType(AddressSchemas, ['location']) {
  @Expose()
  city?: string

  @Expose()
  poiName: string

  @Expose()
  poiAddress: string

  @Expose()
  details: string

  @Expose()
  lon: number

  @Expose()
  lat: number
}
