import { MaxLength, IsNotEmpty, IsEnum, IsOptional } from 'class-validator'
import { IntersectionType, OmitType } from '@nestjs/mapped-types'
import { presets } from '@/common/constants/valid'
import { Order, ORDER_TYPE, PAYMENT_TYPE } from '../schemas/order.schema'
import { CreateOrderDto } from './create-order.dto'

const { maxDescriptionLength } = presets

export class SubmitOrderDto extends IntersectionType(CreateOrderDto, OmitType(Order, [])) {
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

  /** 操作完成时间 */
  @IsOptional()
  completedAt?: Date

  /** 备注 */
  @MaxLength(maxDescriptionLength)
  @IsOptional()
  remark?: string
}
