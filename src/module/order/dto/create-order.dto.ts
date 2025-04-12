import {
  MaxLength,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  IsOptional
} from 'class-validator'
import { Type } from 'class-transformer'
import { presets } from '@/common/constants/valid'

const { maxDescriptionLength } = presets
import {
  OrderInterface,
  ORDER_TYPE,
  PAYMENT_TYPE,
  Commodity
} from '../interface/order.interface'
import { CommodityDto } from './commodity.dto'

export class CreateOrderDto implements OrderInterface {
  /**
   * 订单类型，必需
   */
  @IsNotEmpty()
  orderType: ORDER_TYPE

  /**
   * 优惠金额，可选
   */
  @Min(0)
  @IsNumber()
  @IsOptional()
  discountAmount?: number

  /**
   * 支付类型，必需
   */
  @IsNotEmpty()
  paymentType: PAYMENT_TYPE

  /**
   * 桌号，可选
   */
  @IsOptional()
  table_number?: string

  /**
   * 完成时间，可选
   */
  @IsOptional()
  completedAt?: Date

  /**
   * 备注，可选
   */
  @MaxLength(maxDescriptionLength)
  @IsOptional()
  remark?: string

  @ValidateNested({ each: true })
  @Type(() => CommodityDto)
  @IsArray()
  @IsOptional()
  commoditys: Commodity[]
}
