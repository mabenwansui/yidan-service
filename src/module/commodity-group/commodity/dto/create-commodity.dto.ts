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

const { maxTitleLength, maxDescriptionLength } = presets

export class CreateCommodityDto {
  /** 商品名称 */
  @IsNotEmpty({ message: '商品名称不能为空' })
  @MaxLength(maxTitleLength, { message: `商品名称不能超过${maxTitleLength}个字` })
  name: string

  /** 商品标签 */
  @IsArray({ message: '商品标签必须是数组' })
  @ArrayMaxSize(maxTitleLength, { message: `商品标签不能超过${maxTitleLength}个` })
  @IsString({ each: true, message: '商品标签必须是字符串' })
  @MaxLength(maxTitleLength, {
    each: true,
    message: `商品标签长度不能超过${maxTitleLength}个字`
  })
  @IsOptional()
  tags?: [string]

  /** 原价 */
  @Min(0, { message: '原价不能为负数' })
  @IsNumber({}, { message: '原价必须是数字' })
  @Type(() => Number)
  @IsOptional()
  originalPrice?: number

  /** 现价 */
  @IsNumber({ allowNaN: false }, { message: '商品价格必须是数字' })
  @Type(() => Number)
  @IsNotEmpty({ message: '商品价格不能为空' })
  price: number

  /** 商品描述 */
  @MaxLength(presets.maxDescriptionLength, {
    message: `商品描述不能超过${maxDescriptionLength}个字`
  })
  @IsOptional()
  description?: string

  /** 商品分类 */
  @IsString({ message: '商品分类必须是字符串' })
  @IsOptional()
  category?: string

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

  /** 商品库存 */
  @IsNumber({}, { message: '商品库存必须是数字' })
  @Min(0, { message: '商品库存不能为负数' })
  @IsOptional()
  stockConunt?: number

  /** 已售 */
  @IsNumber({}, { message: '已售必须是数字' })
  @Min(0, { message: '已售不能为负数' })
  @IsOptional()
  soldCount?: number
}
