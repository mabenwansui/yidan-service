import {
  MaxLength,
  IsNotEmpty,
  IsArray,
  IsString,
  ArrayMaxSize,
  IsNumber,
  Min,
  IsOptional
} from 'class-validator'
import { Type } from 'class-transformer'
import { presets } from '@/common/constants/valid'
import { OmitType } from '@nestjs/mapped-types'
import { Commodity } from '../schemas/commodity.schema'

const { maxTitleLength, maxDescriptionLength } = presets

export class CreateCommodityDto extends OmitType(Commodity, ['category']) {
  /** 商品名称 */
  @IsNotEmpty({ message: '商品名称不能为空' })
  @MaxLength(maxTitleLength, { message: `商品名称不能超过${maxTitleLength}个字` })
  name: string

  /** 商品标签 */
  @MaxLength(maxTitleLength, {
    each: true,
    message: `商品标签长度不能超过${maxTitleLength}个字`
  })
  @IsString({ each: true, message: '商品标签必须是字符串' })
  @IsArray({ message: '商品标签必须是数组' })
  @IsOptional()
  tags?: [string]

  /** 商品描述 */
  @MaxLength(presets.maxDescriptionLength, {
    message: `商品描述不能超过${maxDescriptionLength}个字`
  })
  @IsOptional()
  description?: string

  /** 商品分类 */
  @IsString({ message: '商品分类必须是字符串' })
  @IsOptional()
  categoryId?: string

  /** 商品详情 */
  @IsString({ message: '商品详情必须是字符串' })
  @IsOptional()
  details?: string

  /** 商品图片 */
  @IsArray({ message: '商品图片必须是数组' })
  @ArrayMaxSize(presets.maxLength, {
    message: `商品图片不能超过${presets.maxLength}个`
  })
  @IsOptional()
  imgNames?: [string]

  /** 商品封面图 */
  @IsOptional()
  coverImageUrl?: string
}
