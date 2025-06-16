import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator'
import { SenderType } from '../interface/message.interface'
import { PageBaseDto } from '@/common/dto/page-base.dto'

export class FindOneMessageDto {
  @IsNotEmpty()
  id: string
}

export class SearchMessageDto extends PageBaseDto {
  @IsOptional()
  id?: string

  @IsOptional()
  senderId?: string

  @IsEnum(SenderType)
  @IsOptional()
  senderType: SenderType

  @IsOptional()
  isRead?: boolean
}