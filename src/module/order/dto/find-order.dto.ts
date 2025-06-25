import { OmitType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'
import { ORDER_STATUS, ORDER_TYPE } from '../schemas/order.schema'

export class FindOneOrderDto {
  @IsNotEmpty()
  orderId: string 
}

export class SearchOrderDto extends PageBaseDto {
  @IsOptional()
  storeId?: string

  @IsOptional()
  orderType?: ORDER_TYPE

  /** 订单状态 */
  @IsOptional()
  orderStatus?: ORDER_STATUS | any  // 更复杂的查询条件
}

export class AdminSearchOrderDto extends OmitType(SearchOrderDto, ['orderStatus']) {
  @IsOptional()
  orderStatus?: Omit<ORDER_STATUS, 'PENDING'>
}

export class AdminSearchArchivedOrderDto extends OmitType(SearchOrderDto, ['orderStatus']) {

}