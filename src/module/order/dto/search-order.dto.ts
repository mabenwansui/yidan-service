import { IsNotEmpty, IsOptional } from 'class-validator'
import { ORDER_STATUS } from '../schemas/order.schema'

export class SearchOrderDto {
  /** 店铺ID */
  @IsOptional()
  storeId?: string

  /** 订单类型 */
  @IsOptional()
  orderType?: ORDER_STATUS

  /** 订单状态 */
  @IsOptional()
  orderStatus?: ORDER_STATUS
}
