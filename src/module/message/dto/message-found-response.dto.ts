import { OmitType } from '@nestjs/mapped-types'
import { Expose, Type, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { Message, SenderType } from '../schemas/message.schema'

export class MessageFoundOneResponseDto extends OmitType(Message, []) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  messageType: Message['messageType']

  @Expose()
  content?: Message['content']

  @Expose()
  isRead: boolean

  @Expose()
  @Type(() => UserFoundOneResponseDto)
  sender?: UserFoundOneResponseDto

  @Expose()
  senderType: SenderType

  @Expose()
  readAt: Date

  @Expose()
  sendTime: Date
}
