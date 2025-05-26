import { IsNotEmpty } from 'class-validator'

export class DeleteStoreDto {
  @IsNotEmpty()
  id: string
}
