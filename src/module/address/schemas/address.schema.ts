import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { AddressSchemas } from '@/common/schemas/address.schemas'
import { User } from '@/module/user/schemas/user.schema'

export type AddressDocument = HydratedDocument<Address>

@Schema({ timestamps: true })
export class Address extends AddressSchemas {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  contactName: string

  @Prop({ required: true, type: String, enum: User['sex'] })
  sex: User['sex']

  @Prop({ required: true })
  phoneNumber: string

  @Prop({ required: true })
  title: string

  @Prop({ default: false })
  isDefault: boolean
}

export const AddressSchema = SchemaFactory.createForClass(Address)
AddressSchema.index({ location: '2dsphere' }, { name: 'AddressLocationIndex' })
