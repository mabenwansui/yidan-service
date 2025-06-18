import {
  Body,
  Controller,
  Post,
  Sse,
  Req,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { MessageService } from './service/message.service'
import { MessageDbService } from './service/message-db.service'
import { SearchMessageDto } from './dto/find-message.dto'
import { MessageSearchedResponseDto } from './dto/message-found-response.dto'
import { ReadMessageDto } from './dto/read-message.dto'
import { DeleteMessageDto } from './dto/delete-message.dto'

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageDbService: MessageDbService
  ) {}

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('delete')
  async delete(@Req() request, @Body() deleteMessageDto: DeleteMessageDto) {
    const { id, messageType } = deleteMessageDto
    return await this.messageDbService.delete({
      id,
      userId: request.user.sub,
      messageType
    })
  }

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('unread-total')
  async getUnReadTotal(@Req() request) {
    return await this.messageDbService.getUnReadTotal(request.user.sub)
  }

  @Post('read')
  @Auth(ROLE.ADMIN, ROLE.USER)
  async read(@Req() request, @Body() readMessageDto: ReadMessageDto) {
    const { id, messageType } = readMessageDto
    return await this.messageDbService.setRead({
      id,
      userId: request.user.sub,
      messageType: messageType
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', enableImplicitConversion: true, type: MessageSearchedResponseDto })
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('list')
  async list(@Req() request, @Body() searchMessageDto: SearchMessageDto) {
    return await this.messageDbService.search({
      ...searchMessageDto,
      receiver: request.user.sub
    })
  }

  @Auth(ROLE.ADMIN)
  @Sse('sse')
  async messageEvent(@Req() request) {
    return this.messageService.getEventStream(request.user.sub)
  }
}
