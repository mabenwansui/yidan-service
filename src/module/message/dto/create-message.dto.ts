import { OmitType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator'
import { Message, MessageType, SenderType } from '../schemas/message.schema'

class Content {
  orderId: string
}

export class CreateOrderMessageDto {
  storeId: string
  type: MessageType.ORDER
  content: Content
  senderType: SenderType.SYSTEM
}

export class CreateOrderSystemMessageDto {

}