import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

@Schema({ timestamps: true })
export class UserMessage {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'message' })
  message: Types.ObjectId

  @Prop({ required: true, type: Boolean, default: false })
  isRead?: boolean

  @Prop({ type: Date })
  readAt?: Date
}
export const MessageSchema = SchemaFactory.createForClass(UserMessage)
