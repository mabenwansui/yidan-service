import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator'
import { CreateBaseMessageDto } from './create-base-message.dto'
import { OrderMessage } from '../interface/message.interface'

export class CreateOrderMessageDto extends CreateBaseMessageDto implements Partial<OrderMessage> {
  @IsNotEmpty()
  type: OrderMessage['type']

  @IsOptional()
  content: OrderMessage['content']
}
