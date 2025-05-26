import { IsString, IsArray, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator'
import { PickType, IntersectionType } from '@nestjs/mapped-types'
import { AddressLocationBaseDto } from '@/common/dto/address-base.dto'
import { Store } from '../schemas/store.schema'

export class CreateStoreDto extends IntersectionType(
  AddressLocationBaseDto,
  PickType(Store, ['name', 'imgNames', 'coverImageUrl', 'description', 'open', 'details'] as const)
) {
  /** 项目名称 */
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
