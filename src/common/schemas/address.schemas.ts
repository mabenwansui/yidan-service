import { Prop } from '@nestjs/mongoose'
import { AddressLocationInterface } from '@/common/types/address.interface'

export class LocationPointSchema {
  @Prop({ required: true, type: String, enum: ['Point'] })
  type: 'Point'

  @Prop({ required: true, type: [Number] })
  coordinates: [number, number]
}

export class AddressSchemas implements Omit<AddressLocationInterface, 'lon' | 'lat'> {
  @Prop()
  city?: string

  @Prop({ required: true })
  poiName: string

  @Prop({ required: true })
  poiAddress: string

  @Prop({ required: true })
  details: string

  @Prop({ required: true, type: LocationPointSchema })
  location: LocationPointSchema
}
