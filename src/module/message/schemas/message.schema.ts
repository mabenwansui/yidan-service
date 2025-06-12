import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

export enum MessageType {
  ORDER = 'order'
}
export enum SenderType {
  SYSTEM = 'system',
  USER = 'user'
}

export class Base {
  title?: string
  content?: string
}

export class OrderContent extends Base {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'order' })
  order: Types.ObjectId
}

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, enum: MessageType })
  messageType: MessageType

  @Prop({ required: true, type: OrderContent })
  content: OrderContent

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
MessageSchema.index({ store: 1, receiver: 1, createdAt: -1 })
MessageSchema.index({ store: 1, messageType: 1, createdAt: -1 })
MessageSchema.index({ store: 1, senderType: 1, createdAt: -1 })
MessageSchema.index({ store: 1, messageType: 1, isRead: 1, createdAt: -1 })
MessageSchema.index({ store: 1, messageType: 1, isRead: 1, createdAt: -1 })
