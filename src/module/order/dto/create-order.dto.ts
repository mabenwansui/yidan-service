import { IsNotEmpty, IsArray, ValidateNested, IsOptional, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class CommodityDto {
  @IsNotEmpty()
  commodityId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number
}

export class CreateOrderDto {
  /** 店铺 */
  @IsNotEmpty()
  storeId: string

  /** 桌号 */
  @IsOptional()
  table_number?: string

  @ValidateNested({ each: true })1
  @Type(() => CommodityDto)
  @IsArray()
  @IsNotEmpty()
  commoditys: CommodityDto[]
}
