import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { Types } from 'mongoose'
import { MessageService } from './message.service'
import { MessageType } from './schemas/message.schema'

interface MessageBase<T = Record<never, never>> {
  storeId: string
  userIds: Types.ObjectId[]
  message: T & {
    title?: string
    content?: string
  }
}
export type JobTypeOrder = MessageBase<{ orderId: string }>
export type JobTypeSystem = MessageBase
export type JobType = JobTypeOrder | JobTypeSystem

@Processor('message')
export class MessageProcessor extends WorkerHost {
  constructor(private readonly messageService: MessageService) {
    super()
  }
  async process(job: Job<JobType>): Promise<void> {
    const { name } = job
    switch (name) {
      case 'order-paid':
        await this.orderPaid(job as Job<JobTypeOrder>)
        break
    }
  }

  private async orderPaid(job: Job<JobTypeOrder>) {    
    await this.messageService.insertManyOrder(job.data)
    const doc = await this.messageService.search({
      store: job.data.storeId,
      receiver: {
        $in: job.data.userIds
      }
    })
    doc.forEach((item)=> {
      this.messageService.emitNewMessage({
        id: item._id.toString(),
        messageType: item.messageType,
        content: item.content,
        isRead: item.isRead,
        sender: item.sender,
        senderType: item.senderType,
        readAt: item.readAt,
        sendTime: item.sendTime
      })
    })    
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`✅ 消息成功发送：${job.id}`)
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`❌ 发送失败：${job?.id}，原因：${err.message}`)
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(`🚀 开始发送：${job.name} (ID: ${job.id})`)
  }
}
