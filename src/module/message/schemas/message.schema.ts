import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { UserInterface } from '@/module/user/interface/user.interface'

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  content: string

  @Prop({ required: true, type: Types.ObjectId, ref: 'user' })
  sender: UserInterface | { id: 'system', nickname: '系统消息' }

  @Prop({ required: true })
  receiverId: string

  @Prop({ required: true, type: Boolean })
  isRead: boolean

  constructor() {
    this.isRead = false
  }
}
export const MessageSchema = SchemaFactory.createForClass(Message)
