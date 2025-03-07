import { IsNotEmpty } from 'class-validator'

export class DeleteCategoryDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: string
}
