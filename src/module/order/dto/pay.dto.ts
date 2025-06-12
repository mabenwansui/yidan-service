import { IsNotEmpty, IsEnum } from 'class-validator'

export class PayDto {
  @IsNotEmpty()
  orderId: string
}  
