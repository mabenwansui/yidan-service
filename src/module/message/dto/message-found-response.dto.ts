import { OmitType } from '@nestjs/mapped-types'
import { Expose, Type, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { PageBaseResponseDto } from '@/common/dto/page-base.dto'
import { Message } from '../schemas/message.schema'
import { SenderType } from '../interface/message.interface'

class Content_Order {
  @Expose()
  orderId: string
}

export class MessageFoundOneResponseDto extends OmitType(Message, []) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  messageType: Message['messageType']

  @Expose()
  title: string

  @Expose()
  @Type(() => Content_Order || String)
  content?: Content_Order | string

  @Expose()
  extra?: any

  @Expose()
  isRead: boolean

  @Expose()
  @Type(() => UserFoundOneResponseDto)
  sender?: UserFoundOneResponseDto

  @Expose()
  senderType: SenderType

  // @Expose()
  // @Type(() => StoreFoundOneResponseDto)
  // store: StoreFoundOneResponseDto

  // @Expose()
  // @Type(() => UserFoundOneResponseDto)
  // receiver: UserFoundOneResponseDto

  @Expose()
  readAt: Date

  @Expose()
  sendTime: Date
}

export class MessageSearchedResponseDto extends PageBaseResponseDto {
  @Expose()
  @Type(() => MessageFoundOneResponseDto)
  list: MessageFoundOneResponseDto[]
}
