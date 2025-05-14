import { MaxLength, IsNotEmpty, IsEnum, IsOptional } from 'class-validator'
import { presets } from '@/common/constants/valid'
import {
  OrderInterface,
  ORDER_TYPE,
  ORDER_STATUS,
  PAYMENT_TYPE,
  PAYMENT_STATUS
} from '../interface/order.interface'
import { CreateOrderDto } from './create-order.dto'

const { maxDescriptionLength } = presets

export class SubmitOrderDto
  extends CreateOrderDto
  implements Omit<OrderInterface, 'user' | 'table_number' | 'commoditys' | 'originalAmount' | 'store'>
{
  /** 订单ID */
  @IsNotEmpty()
  orderId: string

  /** 订单状态 */
  @IsEnum(ORDER_STATUS)
  @IsNotEmpty()
  orderStatus: OrderInterface['orderStatus']

  /** 订单类型 */
  @IsEnum(ORDER_TYPE)
  @IsNotEmpty()
  orderType: OrderInterface['orderType']

  /** 支付类型 */
  @IsEnum(PAYMENT_TYPE)
  @IsNotEmpty()
  paymentType: OrderInterface['paymentType']

  /** 支付状态 */
  @IsEnum(PAYMENT_STATUS)
  paymentStatus: OrderInterface['paymentStatus']

  /** 完成时间 */
  @IsOptional()
  completedAt?: Date

  /** 备注 */
  @MaxLength(maxDescriptionLength)
  @IsOptional()
  remark?: string
}
