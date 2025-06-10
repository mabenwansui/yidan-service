import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model, Types } from 'mongoose'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Message } from './schemas/message.schema'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessageFoundOneResponseDto } from './dto/message-found-response.dto'
import { MessageCreatedResponseDto } from './dto/message-created-response.dto'
import { MessageType } from './schemas/message.schema'

@Injectable()
export class MessageService {
  private readonly subject = new Subject<any>()
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message & { createdAt: Date }>
  ) {
    this.getEventStream()
  }

  private emitNewMessage(message: MessageFoundOneResponseDto) {
    this.subject.next(message)
  }

  async createOrderSystemMessage(orderId: string) {
    const doc = await this.messageModel.create({
      type: MessageType.ORDER,
      title: '您有新的订单',
      order: orderId
    })
    // 得再查一次user
    // this.emitNewMessage(doc)
  }  

  getEventStream(): Observable<any> {
    return this.subject.asObservable().pipe(map((message: MessageFoundOneResponseDto) => message))
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
