import { Body, Controller, Post, Get, Sse, Req } from '@nestjs/common'
import { MessageService } from './message.service'

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('delete')
  async delete() {

  }

  @Sse('sse')
  async messageEvent() {
    return this.messageService.getEventStream()
  }
}