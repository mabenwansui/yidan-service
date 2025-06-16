import { OmitType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator'
import { MessageType, SenderType } from '../interface/message.interface'

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