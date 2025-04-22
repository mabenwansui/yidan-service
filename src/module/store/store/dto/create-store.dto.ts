import { StoreInterface } from '../interface/store.interface'
import { Types } from 'mongoose'
import {
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,  
  IsBoolean
} from 'class-validator'
import { Type } from 'class-transformer'
import { City } from '@/common/types/city'
import { CityDto } from '@/common/dto/city.dto'

export class CreateStoreDto implements StoreInterface {
  /** 项目名称，必须且唯一 */
  @IsString()
  @IsNotEmpty()
  name: string

  /** 项目描述，可选字段 */
  @IsOptional()
  description?: string

  /** 项目负责人，存储用户的 ObjectId 数组 */
  @IsArray()
  @IsOptional()
  owner?: Types.ObjectId[]

  /** 图片名称数组，可选字段 */
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  imgNames?: string[]

  /** 封面图片的 URL，可选字段 */
  @IsOptional()
  coverImageUrl?: string

  /** 项目所在城市，可选字段 */
  @Type(() => CityDto)
  @IsArray()
  @IsOptional()
  city?: City

  /** 项目地址，可选字段 */
  @IsOptional()
  address?: string

  
  @IsBoolean()
  @IsOptional()
  open?: boolean // 营业状态

  /** 项目地理位置，包含纬度和经度，可选字段 */
  // @Type(() => Object)
  // @ValidateNested()
  // @IsObject()
  @IsOptional()
  location?: {
    lat: number
    lng: number
  }
}
