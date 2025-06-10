import { IsNotEmpty, IsEnum } from 'class-validator'
import { ORDER_STATUS } from '../schemas/order.schema'

export class PayDto {
  @IsNotEmpty()
  orderId: string

  @IsEnum(ORDER_STATUS)
  @IsNotEmpty()
  orderStatus: ORDER_STATUS
}  
