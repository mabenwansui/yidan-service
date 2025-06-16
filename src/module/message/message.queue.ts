import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { JobType } from './interface/message.interface'

@Injectable()
export class MessageQueue {
  constructor(@InjectQueue('message') private queue: Queue<JobType>) {}

  async addQueue(name, params: any) {
    await this.queue.add(name, params, { removeOnComplete: 10 })
  }
}
