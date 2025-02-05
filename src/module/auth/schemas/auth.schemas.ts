import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<Auth>

@Schema()
export class Auth {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  userName: string

  @Prop({ required: true })
  key: string

  @Prop({ required: true })
  expiresIn?: Date
}

export const AuthSchema = SchemaFactory.createForClass(Auth)
