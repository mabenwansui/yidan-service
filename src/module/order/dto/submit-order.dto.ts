import { MaxLength, IsNotEmpty, IsEnum, IsOptional } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { presets } from '@/common/constants/valid'
import { Order, ORDER_TYPE, PAYMENT_TYPE } from '../schemas/order.schema'
import { CreateOrderDto } from './create-order.dto'

const { maxRemarkLength } = presets

export class SubmitOrderDto extends PartialType(CreateOrderDto) {
  /** 订单ID */
  @IsNotEmpty()
  orderId: string

  /** 订单类型 */
  @IsEnum(ORDER_TYPE)
  @IsNotEmpty()
  orderType: ORDER_TYPE

  /** 支付类型 */
  @IsEnum(PAYMENT_TYPE)
  @IsNotEmpty()
  paymentType: PAYMENT_TYPE

  /** 备注 */
  @MaxLength(maxRemarkLength)
  @IsOptional()
  remark?: string
}
