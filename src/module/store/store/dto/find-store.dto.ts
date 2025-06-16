import { IsOptional, IsNumber, IsNotEmpty } from 'class-validator'
import { PageBaseDto } from '@/common/dto/page-base.dto'

export class SearchStoreDto extends PageBaseDto {
  @IsOptional()
  name?: string

  @IsOptional()
  owner?: string
}

export class FindNearStoreDto {
  /** 经度 */
  @IsNumber()
  @IsNotEmpty()
  lon: number

  /** 纬度 */
  @IsNumber()
  @IsNotEmpty()
  lat: number
}