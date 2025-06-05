import { IsNotEmpty } from 'class-validator'

export class ChangeCartDto {
  @IsNotEmpty()
  branchId: string

  @IsNotEmpty()
  quantity: number
}
