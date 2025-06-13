import { Injectable } from '@nestjs/common'
import { Observable, Subject } from 'rxjs'
import { ROLE } from '@/common/constants/role'
import { UserService } from '@/module/user/user.service'
import { MessageQueue } from '../message.queue'
import { JobNameType } from '../interface/message.interface'
import { MessageFoundOneResponseDto } from '../dto/message-found-response.dto'

@Injectable()
export class MessageService {
  constructor(
    private readonly messageQueue: MessageQueue,
    private readonly userService: UserService
  ) {}

  private userStreams = new Map<string, Subject<MessageFoundOneResponseDto>>()

  emitEventStream(userId: string, message: MessageFoundOneResponseDto) {
    const stream = this.userStreams.get(userId)
    if (stream) stream.next(message)
  }
  getEventStream(userId: string): Observable<MessageFoundOneResponseDto> {
    if (!this.userStreams.has(userId)) {
      this.userStreams.set(userId, new Subject<MessageFoundOneResponseDto>())
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
    const pageSize = 100
    const fn = async (curPage: number) => {
      const { total, list } = await this.userService.search({
        role: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
        curPage,
        pageSize
      })
      this.messageQueue.addQueue(JobNameType.ORDER_PAID, {
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
}
