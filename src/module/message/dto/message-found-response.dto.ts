import { OmitType } from '@nestjs/mapped-types'
import { Expose, Type, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { Message } from '../schemas/message.schema'

export class MessageFoundOneResponseDto extends OmitType(Message, ['sender']) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  type: Message['type']

  @Expose()
  title: string

  @Expose()
  content?: Message['content']

  @Expose()
  senderType: Message['senderType']

  @Expose()
  @Type(() => UserFoundOneResponseDto)
  sender?: UserFoundOneResponseDto

  @Expose()
  receiverId: string

  @Expose()
  isRead: boolean

  @Expose()
  createdAt: Date
}
