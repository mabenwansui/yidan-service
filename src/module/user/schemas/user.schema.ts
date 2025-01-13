import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ROLE } from '../constants'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ required: true })
  username: string

  @Prop()
  password: string

  @Prop()
  role: ROLE

  @Prop()
  id: string

  @Prop()
  email?: string

  @Prop()
  phoneNumber?: string

  @Prop({ default: Date.now })
  createdAt?: Date

  @Prop({ default: Date.now })
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
