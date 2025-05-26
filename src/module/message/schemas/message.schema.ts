import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

export enum MessageType {
  DEFAULT ='default',
  ORDER = 'order'
}

export enum SenderType {
  USER = 'user',
  SYSTEM = 'system'
}

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, type: String, enum: MessageType })
  type: MessageType

  @Prop({ required: true })
  title: string

  @Prop({ type: mongoose.Schema.Types.Mixed })
  content?: string | Object

  @Prop({ required: true, type: String, enum: SenderType })
  senderType: SenderType

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  sender?: Types.ObjectId

  @Prop({ required: true })
  receiverId: string

  @Prop({ required: true, type: Boolean, default: false })
  isRead?: boolean
}
export const MessageSchema = SchemaFactory.createForClass(Message)
