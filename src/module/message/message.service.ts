import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Message } from './schemas/message.schema'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessageFoundOneResponseDto } from './dto/message-found-response.dto'
import { MessageCreatedResponseDto } from './dto/message-created-response.dto'
import { SenderType, MessageType } from './schemas/message.schema'

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

  private async create(createMessageDto: CreateMessageDto) {
    return await this.messageModel.create(createMessageDto)
  }

  async createOrderSystemMessage(content: CreateMessageDto['content']) {
    // const data = {
    //   type: MessageType.ORDER,
    //   title: '您有新的订单',
    //   content,
    //   receiverId: '',
    //   senderType: SenderType.SYSTEM,
    //   // sender: { id: 'system' }
    // }
    // const doc = await this.create(data)
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
