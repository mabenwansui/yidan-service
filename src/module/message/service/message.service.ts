import { Injectable } from '@nestjs/common'
import { Subject } from 'rxjs'
import { StoreService } from '@/module/store/store/store.service'
import { UserService } from '@/module/user/user.service'
import { MessageQueue } from '../message.queue'
import { JobNameType, MessageEvent } from '../interface/message.interface'

@Injectable()
export class MessageService {
  constructor(
    private readonly messageQueue: MessageQueue,
    private readonly storeService: StoreService,
    private readonly userService: UserService
  ) {}
  private userStreams = new Map<string, Subject<MessageEvent>>()
  emitEventStream(userId: string, messageEvent: MessageEvent) {
    const stream = this.userStreams.get(userId)
    if (stream) stream.next(messageEvent)
  }
  getEventStream(userId: string) {
    if (!this.userStreams.has(userId)) {
      this.userStreams.set(userId, new Subject<MessageEvent>())
    }
    return this.userStreams.get(userId).asObservable()
  }
  removeEventStream(userId: string) {
    const stream = this.userStreams.get(userId)
    if (stream) {
      stream.complete()
      this.userStreams.delete(userId)
    }
  }
  async createPayMessage(storeId: string, orderId: string) {
    const superAdmin = await this.userService.getSuperAdminInfo()
    const store = await this.storeService.findOne({ _id: storeId })
    const owners = [superAdmin, ...store.owner]
    this.messageQueue.addQueue(JobNameType.ORDER_PAID, {
      storeId,
      userIds: owners.map((item) => item._id),
      message: { orderId }
    })
  }
}

// async createPayMessage(storeId: string, orderId: string) {
//   const pageSize = 100
//   const fn = async (curPage: number) => {
//     const { total, list } = await this.orderService.findOne({
//       role: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
//       curPage,
//       pageSize
//     })
//     this.messageQueue.addQueue(JobNameType.ORDER_PAID, {
//       storeId,
//       userIds: list.map((item) => item._id),
//       message: {
//         orderId
//       }
//     })
//     if (curPage * pageSize < total) fn(curPage + 1)
//   }
//   fn(1)
// }
