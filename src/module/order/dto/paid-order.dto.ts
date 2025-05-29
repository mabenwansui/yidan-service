import { MaxLength, IsNotEmpty, IsEnum, IsOptional } from 'class-validator'
import { IntersectionType, OmitType } from '@nestjs/mapped-types'
import { presets } from '@/common/constants/valid'
import { Order, ORDER_TYPE, PAYMENT_TYPE } from '../schemas/order.schema'
import { SubmitOrderDto } from './submit-order.dto'

const { maxDescriptionLength } = presets

export class PaidOrderDto extends OmitType(Order, []) {
  /** 订单ID */
  @IsNotEmpty()
  orderId: string
}
