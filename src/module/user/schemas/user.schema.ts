import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ROLE } from '@/common/constants/role'
import { User as IUser } from '../interface/user.interface'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ required: true, unique: true })
  id: string

  @Prop({ required: true, unique: true })
  username: string

  @Prop()
  password?: string

  @Prop({ required: true })
  role: ROLE[]

  @Prop({ unique: true, sparse: true })
  openidMpWx: string

  @Prop({ unique: true, sparse: true })
  email?: string

  @Prop({ unique: true, sparse: true })
  phoneNumber?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
