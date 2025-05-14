import { AddressInterface } from '../interface/address.interface'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AddressDocument = HydratedDocument<Address>

@Schema({ timestamps: true })
export class Address implements AddressInterface {
  @Prop({ required: true })
  receiver: string

  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  city: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  phoneNumber: string

  @Prop()
  title: string

  @Prop({ default: false })
  isDefault: boolean
}

export const AddressSchema = SchemaFactory.createForClass(Address)
