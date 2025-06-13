import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { JobTypeOrder, JobType, JobNameType } from './interface/message.interface'
import { MessageService } from './service/message.service'
import { MessageDbService } from './service/message-db.service'
import { MessageType, SenderType } from './schemas/message.schema'

@Processor('message')
export class MessageProcessor extends WorkerHost {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageDbService: MessageDbService
  ) {
    super()
  }
  async process(job: Job<JobType>): Promise<void> {
    const { name } = job
    switch (name) {
      case JobNameType.ORDER_PAID:
        await this.orderPaid(job as Job<JobTypeOrder>)
        break
    }
  }

  private async orderPaid(job: Job<JobTypeOrder>) {
    const { userIds, message, storeId } = job.data
    const { orderId, ...messageRest } = message
    await this.messageDbService.insertMany(userIds.map((receiver)=> ({
      store: storeId,
      receiver,
      messageType: MessageType.ORDER,
      content: {
        order: orderId,
        ...messageRest
      },
      senderType: SenderType.SYSTEM,
      sendTime: new Date()
    })))
    const doc = await this.messageDbService.search({
      store: job.data.storeId,
      receiver: {
        $in: job.data.userIds
      }
    })
    doc.forEach((item) => {
      const { messageType, content, isRead, sender, senderType, readAt, sendTime } = item
      this.messageService.emitEventStream(item.receiver._id.toString(), {
        id: item._id.toString(),
        messageType,
        content,
        isRead,
        sender,
        senderType,
        readAt,
        sendTime
      })
    })
  }
  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`❌ 发送失败：${job?.id}，原因：${err.message}`)
  }
}
