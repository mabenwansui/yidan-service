import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ROLE } from '@/common/constants/role'
import { User as IUser } from '../interface/user.interface'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User implements IUser {
  @Prop({ required: true })
  username: string

  @Prop()
  password: string

  @Prop({ required: true })
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
