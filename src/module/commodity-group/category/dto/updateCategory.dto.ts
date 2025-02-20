import { MaxLength, IsNotEmpty } from 'class-validator'
import { presets } from '@/common/constants/valid'

const { maxTagLength } = presets

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: string

  /** 类别名称 */
  @IsNotEmpty({ message: '类别不能为空' })
  @MaxLength(maxTagLength, { message: `类别不能超过${maxTagLength}个字` })
  name: string
}
