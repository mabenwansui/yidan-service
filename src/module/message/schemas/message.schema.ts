import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

export enum MessageType {
  DEFAULT ='default',
  ORDER = 'order'
}

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, type: String, enum: MessageType })
  type: MessageType

  @Prop({ required: true })
  title: string

  @Prop({ type: mongoose.Schema.Types.Mixed })
  content?: string | Object

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order?: Types.ObjectId
}
export const MessageSchema = SchemaFactory.createForClass(Message)
