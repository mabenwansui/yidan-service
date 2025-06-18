import { IsNotEmpty, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

class CommodityItem {
  @IsNotEmpty()
  branchId: string
  @IsNotEmpty()
  quantity: number
}

export class CreateOrderDto {
  /** 店铺 */
  @IsNotEmpty()
  storeId: string

  /** 桌号 */
  @IsOptional()
  tableNumber?: string

  @ValidateNested({ each: true })
  @Type(() => CommodityItem)
  @IsNotEmpty()
  commoditys: CommodityItem[]
}
