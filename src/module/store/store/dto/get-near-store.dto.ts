import { IsNotEmpty, IsNumber } from 'class-validator'

export class GetNearStoreDto {
  /** 经度 */
  @IsNumber()
  @IsNotEmpty()
  lon: number

  /** 纬度 */
  @IsNumber()
  @IsNotEmpty()
  lat: number
}
