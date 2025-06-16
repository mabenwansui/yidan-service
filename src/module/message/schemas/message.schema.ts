import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'
import { MessageType, SenderType } from '../interface/message.interface'

class Content_Order {
  orderId: string
}

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, enum: MessageType })
  messageType: MessageType

  @Prop({ type: mongoose.Schema.Types.Mixed })
  extra: any

  @Prop({ required: true, type: String })
  title: string

  @Prop({ type: Content_Order || String })
  content: Content_Order | string

  @Prop({ type: Boolean, default: false })
  isRead?: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender?: Types.ObjectId

  @Prop({ required: true, type: String, enum: SenderType })
  senderType: SenderType

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Types.ObjectId

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receiver: Types.ObjectId

  @Prop({ type: Date })
  readAt?: Date

  @Prop({ type: Date })
  sendTime: Date
}
export const MessageSchema = SchemaFactory.createForClass(Message)
const pub = { store: 1, isRead: 1, createdAt: -1 } as const
MessageSchema.index({ receiver: 1, ...pub })
MessageSchema.index({ senderType: 1, ...pub })
MessageSchema.index({ messageType: 1, ...pub })
