import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { AddressDto } from '@/common/dto/address.dto'
import { LocationPoint } from '@/common/types/address'
import { AddressInterface, SexType } from '../interface/address.interface'

export type AddressDocument = HydratedDocument<Address>

export class LocationPointSchema implements LocationPoint {
  @Prop({ required: true, type: String, enum: ['Point'] })
  type: 'Point'

  @Prop({ required: true, type: [Number] })
  coordinates: [number, number]
}

@Schema({ timestamps: true })
export class Address implements AddressInterface {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  contactName: string

  @Prop({ required: true, type: String, enum: SexType })
  sex: AddressInterface['sex']

  @Prop({ required: true })
  phoneNumber: string

  @Prop({ required: true })
  title: string

  @Prop({ default: false })
  isDefault: boolean

  @Prop({ required: true })
  city?: string

  @Prop({ required: true })
  poiName: string

  @Prop({ required: true })
  poiAddress: string

  @Prop({ required: true })
  details: string

  @Prop({ type: LocationPointSchema })
  location?: LocationPointSchema  
}

export const AddressSchema = SchemaFactory.createForClass(Address)
