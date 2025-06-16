import { IsNotEmpty, IsOptional } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'
import { ORDER_STATUS } from '../schemas/order.schema'

export class FindOneOrderDto {
  @IsNotEmpty()
  orderId: string 
}

export class SearchOrderDto extends PageBaseDto {
  @IsOptional()
  orderId?: string 

  @IsOptional()
  storeId?: string

  @IsOptional()
  orderType?: ORDER_STATUS

  /** 订单状态 */
  @IsOptional()
  orderStatus?: ORDER_STATUS
}