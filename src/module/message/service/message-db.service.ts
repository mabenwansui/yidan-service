import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { PAGE_SIZE } from '@/common/constants/page'
import { Message } from '../schemas/message.schema'
import { MessageSystem } from '../schemas/message_system.schema'
import { MessageType } from '../interface/message.interface'

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
    const { curPage = 1, pageSize = PAGE_SIZE, ...restQuery } = query
    const total = await this.messageModel.countDocuments(restQuery)
    const doc = await this.messageModel
      .find(restQuery)
      .sort({ isRead: 1, createdAt: -1 })
      .populate('sender')
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
    return {
      curPage,
      total,
      pageSize,
      list: doc
    }
  }

  async getUnReadTotal(userId: string) {
    const total = await this.messageModel.countDocuments({ isRead: false, receiver: userId })
    return { total }
  }

  async setRead(params: { userId: string; id?: string; messageType: MessageType }) {
    const { id, userId, messageType } = params
    if (id) {
      await this.messageModel.findOneAndUpdate(
        {
          _id: id,
          receiver: userId
        },
        { isRead: true }
      )
    } else {
      await this.messageModel.updateMany(
        {
          receiver: userId,
          ...((messageType && { messageType }) || {})
        },
        { isRead: true }
      )
    }
    return {}
  }

  async delete(params: { userId: string; id?: string; messageType: MessageType }) {
    const { id, userId, messageType } = params
    if (id) {
      await this.messageModel.findOneAndDelete({ _id: id, receiver: userId })
    } else {
      await this.messageModel.deleteMany({ 
        isRead: true, 
        receiver: userId, 
        ...((messageType && { messageType }) || {}) 
      })
    }
    return {}
  }
}
