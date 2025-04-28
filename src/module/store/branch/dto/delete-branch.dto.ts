import { IsString } from 'class-validator'

export class DeleteBranchDto {
  @IsString()
  id: string
}
