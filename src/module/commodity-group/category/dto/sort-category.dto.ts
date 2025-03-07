import { IsNotEmpty } from 'class-validator'

export class SortCategoryDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: string

  @IsNotEmpty({ message: 'targetId不能为空' })
  targetId: string

  @IsNotEmpty({ message: 'isGap不能为空' })
  isGap: boolean
}
