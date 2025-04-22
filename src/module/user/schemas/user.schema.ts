import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ROLE } from '@/common/constants/role'
import { UserInterface } from '../interface/user.interface'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User implements UserInterface {
  @Prop({ required: true, unique: true })
  id: string

  @Prop({ required: true, unique: true })
  username: string

  @Prop({ unique: true })
  nickname?: string

  @Prop()
  avatarUrl?: string

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
UserSchema.index({ nickname: 'text' });
