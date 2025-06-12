import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Job, Queue } from 'bullmq'
import { JobTypeOrder, JobType } from './message.processor'


@Injectable()
export class MessageQueue {
  constructor(@InjectQueue('message') private queue: Queue<JobType>) {}

  async addOrderQueue(params: JobTypeOrder) {
    await this.queue.add('order-paid', params, { removeOnComplete: 10 })
  }
}
