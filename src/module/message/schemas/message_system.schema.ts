import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'
import { MessageType, SenderType } from '../interface/message.interface'


@Schema({ timestamps: true })
export class MessageSystem {
  @Prop({ required: true, enum: MessageType })
  messageType: MessageType


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'message' })
  sender?: Types.ObjectId

  @Prop({ required: true, type: String, enum: SenderType })
  senderType: SenderType
}
export const MessageSystemSchema = SchemaFactory.createForClass(MessageSystem)
