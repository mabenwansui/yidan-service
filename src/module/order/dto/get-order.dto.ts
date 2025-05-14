import { IsNotEmpty } from 'class-validator'

export class GetOrderDto {
  @IsNotEmpty()
  orderId: string 
}
