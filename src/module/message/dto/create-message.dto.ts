import { OmitType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator'
import { Message } from '../schemas/message.schema'

export class CreateMessageDto extends OmitType(Message, []) {
  @IsEnum(Message['type'])
  @IsNotEmpty()
  type: Message['type']

  @IsNotEmpty()
  title: string
  
  @IsOptional()
  content?: string | object

  @IsOptional()
  sender?: string

  @IsNotEmpty()
  receiverId: string

  @IsBoolean()
  @IsOptional()
  isRead?: boolean
}
