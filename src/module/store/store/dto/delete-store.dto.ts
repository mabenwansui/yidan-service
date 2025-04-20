import { IsNotEmpty } from 'class-validator'

export class DeleteStoreDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: string
}
