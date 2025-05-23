import { Prop } from '@nestjs/mongoose'
import { Expose } from 'class-transformer'
import { AddressLocationInterface } from '@/common/types/address.interface'

export class AddressLocationDto implements AddressLocationInterface {
  @Prop()
  city?: string

  @Prop({ required: true })
  poiName: string

  @Prop({ required: true })
  poiAddress: string

  @Prop({ required: true })
  details: string

  @Prop({ required: true })
  lon: number

  @Prop({ required: true })
  lat: number
}

export class AddressResponseDto implements AddressLocationInterface {
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
