import { IsNotEmpty, IsArray, ValidateNested, IsOptional, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'
import { OrderInterface } from '../interface/order.interface'

export class CommodityDto {
  @IsNotEmpty()
  commodityId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number
}

export class CreateOrderDto implements Pick<OrderInterface, 'table_number'> {
  /** 店铺 */
  @IsNotEmpty()
  storeId: string

  /** 桌号 */
  @IsOptional()
  table_number?: string

  @ValidateNested({ each: true })
  @Type(() => CommodityDto)
  @IsArray()
  @IsNotEmpty()
  commoditys: CommodityDto[]
}
