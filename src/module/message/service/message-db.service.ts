import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Message } from '../schemas/message.schema'
import { MessageSystem } from '../schemas/message_system.schema'

@Injectable()
export class MessageDbService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message & { createdAt: Date }>,
    @InjectModel(MessageSystem.name)
    private readonly messageSystemModel: Model<MessageSystem & { createdAt: Date }>
  ) {}

  async insertMany(query: any) {
    return await this.messageModel.insertMany(query)
  }

  async search(query: any) {
    return await this.messageModel.find(query).populate<any>(['receiver', 'store', 'content.order'])
  }

  async getUnReadTotal() {
    return await this.messageModel.countDocuments({ isRead: false })
  }

  async setRead(id: string) {
    return await this.messageModel.findByIdAndUpdate(id, { isRead: true })
  }

  async delete(id: string) {
    return await this.messageModel.findByIdAndDelete(id)
  }
}
