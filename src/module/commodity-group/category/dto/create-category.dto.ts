import { MaxLength, IsNotEmpty, IsOptional } from 'class-validator'
import { presets } from '@/common/constants/valid'

const { maxTitleLength } = presets

export class CreateCategoryDto {
  /** 类别名称 */
  @MaxLength(maxTitleLength, { message: `类别不能超过${maxTitleLength}个字` })
  @IsNotEmpty({ message: '类别不能为空' })
  title: string

  @IsOptional()
  parentId?: string
}
