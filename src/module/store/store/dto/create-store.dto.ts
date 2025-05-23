import { StoreInterface } from '../interface/store.interface'
import { IsString, IsArray, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator'
import { AddressLocationDto } from '@/common/dto/address.dto'

export class CreateStoreDto extends AddressLocationDto implements Omit<StoreInterface, 'owner'> {
  /** 项目名称 */
  @IsString()
  @IsNotEmpty()
  name: string

  /** 项目描述 */
  @IsOptional()
  description?: string

  /** 项目负责人，存储用户的 ObjectId 数组 */
  @IsArray()
  @IsOptional()
  owner?: string[]

  /** 图片名称 */
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  imgNames?: string[]

  /** 封面图片的 URL，可选字段 */
  @IsOptional()
  coverImageUrl?: string

  @IsBoolean()
  @IsOptional()
  open?: boolean // 营业状态
}
