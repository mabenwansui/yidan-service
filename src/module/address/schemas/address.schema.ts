import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { SexType } from '@/common/types/user.interface'
import { AddressSchemas } from '@/common/schemas/address.schemas'
import { AddressInterface } from '../interface/address.interface'

export type AddressDocument = HydratedDocument<Address>

@Schema({ timestamps: true })
export class Address extends AddressSchemas implements Omit<AddressInterface, 'lon' | 'lat'> {
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
  details: string
}

export const AddressSchema = SchemaFactory.createForClass(Address)
AddressSchema.index({ location: '2dsphere' }, {name: 'AddressLocationIndex'})
