import { IsNotEmpty } from 'class-validator'

export class DeleteProjectDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: string
}
