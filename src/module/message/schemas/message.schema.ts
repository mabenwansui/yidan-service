import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'
import { Base, MessageType, OrderMessage, DefaultMessage } from '../interface/message.interface'

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  title: string

  @Prop({ type: mongoose.Schema.Types.Mixed })
  content?: any

  @Prop({ required: true, type: Types.ObjectId, ref: 'user' })
  sender: Base['sender']

  @Prop({ required: true })
  receiverId: string

  @Prop({ required: true, type: Boolean })
  isRead: boolean

  constructor() {
    this.isRead = false
  }
}
export const MessageSchema = SchemaFactory.createForClass(Message)
