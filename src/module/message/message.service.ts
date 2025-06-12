import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { ROLE } from '@/common/constants/role'
import { UserService } from '@/module/user/user.service'
import { Message, MessageType, SenderType } from './schemas/message.schema'
import { MessageSystem, MessageSystemSchema } from './schemas/message_system.schema'
import { MessageQueue } from './message.queue'
import { JobTypeOrder } from './message.processor'
import { CreateOrderMessageDto } from './dto/create-message.dto'
import { MessageFoundOneResponseDto } from './dto/message-found-response.dto'
import { MessageCreatedResponseDto } from './dto/message-created-response.dto'


@Injectable()
export class MessageService {
  private readonly subject = new Subject<any>()
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message & { createdAt: Date }>,
    @InjectModel(MessageSystem.name)
    private readonly messageSystemModel: Model<MessageSystem & { createdAt: Date }>,
    private readonly messageQueue: MessageQueue,
    private readonly userService: UserService
  ) {}

  public emitNewMessage(message: MessageFoundOneResponseDto) {
    this.subject.next(message)
  }

  async pay(storeId: string, orderId: string) {
    const pageSize = 100
    const fn = async (curPage: number) => {
      const { total, list } = await this.userService.search({
        role: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
        curPage,
        pageSize
      })
      this.messageQueue.addOrderQueue({
        storeId,
        userIds: list.map((item) => item._id),
        message: {
          orderId
        }
      })
      if (curPage * pageSize < total) fn(curPage + 1)
    }
    fn(1)
  }

  async insertManyOrder(dto: JobTypeOrder) {
    const { userIds, message, storeId } = dto
    const { orderId, ...messageRest } = message 
    return await this.messageModel.insertMany(
      userIds.map((receiver) => ({
        store: storeId,
        receiver,
        messageType: MessageType.ORDER,
        content: {
          order: orderId,
          ...messageRest
        },
        senderType: SenderType.SYSTEM,
        sendTime: new Date()
      }))
    )
  }

  async search(query: any) {
    return await this.messageModel.find(query).populate<any>(['receiver', 'store', 'content.order'])
  }

  getEventStream(userId: string): Observable<any> {
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
