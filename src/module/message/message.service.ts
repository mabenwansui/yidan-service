import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Message } from './schemas/message.schema'
import { CreateOrderMessageDto } from './dto/create-order-message.dto'
import { Message as MessageData, MessageType } from './interface/message.interface'
import { OrderInterface } from '@/module/order/interface/order.interface'

@Injectable()
export class MessageService {
  private readonly subject = new Subject<any>()
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message & { createdAt: Date }>
  ) {
    this.getEventStream()
  }

  emitNewMessage(message: MessageData) {
    this.subject.next(message)
  }

  getEventStream(): Observable<any> {
    return this.subject.asObservable().pipe(
      map((message: MessageData) => {
        return message
      })
    )
  }

  async getUnReadTotal() {
    return await this.messageModel.countDocuments({ isRead: false })
  }

  async create(createMessageDto: CreateOrderMessageDto) {
    return await this.messageModel.create(createMessageDto)
  }

  async createOrderSystemMessage(order: OrderInterface) {
    const data: CreateOrderMessageDto = {
      type: MessageType.ORDER,
      title: '您有新的订单',
      content: order,
      receiverId: order.userId,
      sender: { id: 'system' }
    }
    const { createdAt } = await this.create(data)
    this.emitNewMessage({
      ...data,
      isRead: false,
      createdAt
    })
  }

  async setRead(id: string) {
    return await this.messageModel.findByIdAndUpdate(id, { isRead: true })
  }

  async delete(id: string) {
    return await this.messageModel.findByIdAndDelete(id)
  }
}
