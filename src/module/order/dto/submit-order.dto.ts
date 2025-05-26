import { MaxLength, IsNotEmpty, IsEnum, IsOptional } from 'class-validator'
import { IntersectionType, OmitType } from '@nestjs/mapped-types'
import { presets } from '@/common/constants/valid'
import { Order, ORDER_STATUS, ORDER_TYPE, PAYMENT_STATUS, PAYMENT_TYPE } from '../schemas/order.schema'
import { CreateOrderDto } from './create-order.dto'

const { maxDescriptionLength } = presets

export class SubmitOrderDto extends IntersectionType(CreateOrderDto, OmitType(Order, [])) {
  /** 订单ID */
  @IsNotEmpty()
  orderId: string

  /** 订单状态 */
  @IsEnum(ORDER_STATUS)
  @IsNotEmpty()
  orderStatus: ORDER_STATUS

  /** 订单类型 */
  @IsEnum(ORDER_TYPE)
  @IsNotEmpty()
  orderType: ORDER_TYPE

  /** 支付类型 */
  @IsEnum(PAYMENT_TYPE)
  @IsNotEmpty()
  paymentType: PAYMENT_TYPE

  /** 支付状态 */
  @IsEnum(PAYMENT_STATUS)
  paymentStatus: PAYMENT_STATUS

  /** 完成时间 */
  @IsOptional()
  completedAt?: Date

  /** 备注 */
  @MaxLength(maxDescriptionLength)
  @IsOptional()
  remark?: string
}
