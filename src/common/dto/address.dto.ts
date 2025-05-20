import { Prop } from '@nestjs/mongoose'
import { Expose } from 'class-transformer'
import { LocationPoint, AddressInterface } from '@/common/types/address'

class LocationPointDto implements LocationPoint {
  @Prop({ required: true, type: Number })
  type: 'Point'
  @Prop({ required: true, type: [Number] })
  coordinates: [number, number]
}

class LocationPointResponseDto implements LocationPoint {
  @Expose()
  type: 'Point'

  @Expose()
  coordinates: [number, number]
}

export class AddressDto implements AddressInterface {
  @Prop()
  city?: string

  @Prop({ required: true })
  poiName: string

  @Prop({ required: true, type: Number })
  poiAddress: string

  @Prop({ required: true, type: Number })
  details: string

  @Prop({ type: LocationPointDto })
  location?: LocationPoint
}

export class AddressResponseDto implements AddressInterface {
  @Expose()
  city?: string

  @Expose()
  poiName: string

  @Expose()
  poiAddress: string

  @Expose()
  details: string

  @Expose()
  location?: LocationPointResponseDto
}
