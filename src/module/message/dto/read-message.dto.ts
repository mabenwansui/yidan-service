import { IsOptional } from 'class-validator'
import { MessageType } from '../interface/message.interface'

export class ReadMessageDto {
  @IsOptional()
  id?: string

  @IsOptional()
  messageType?: MessageType  
}