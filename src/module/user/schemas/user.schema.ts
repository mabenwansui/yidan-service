import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ROLE } from '@/common/constants/role'

export type UserDocument = HydratedDocument<User>

export enum SexType {
  male = 'male',
  female = 'female'
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ unique: true })
  nickname?: string

  @Prop({ type: String, enum: SexType })
  sex?: SexType

  @Prop()
  avatarUrl?: string

  @Prop()
  password?: string

  @Prop({ 
    required: true,
    type: [String],
    enum: Object.values(ROLE)
  })
  role: ROLE[]

  @Prop({ unique: true, sparse: true })
  openidMpWx?: string

  @Prop({ unique: true, sparse: true })
  email?: string

  @Prop({ unique: true, sparse: true })
  phoneNumber?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.index({ nickname: 'text' });
