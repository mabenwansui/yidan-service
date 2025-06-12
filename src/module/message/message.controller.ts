import { Body, Controller, Post, Get, Sse, Req } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { MessageService } from './message.service'

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('delete')
  async delete() {

  }

  @Post('list')
  async list() {

  }

  @Auth(ROLE.ADMIN)
  @Sse('sse')
  async messageEvent(@Req() request) {
    return this.messageService.getEventStream(request.user.sub)
  }
}