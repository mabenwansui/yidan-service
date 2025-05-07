import { IsNotEmpty } from 'class-validator'
import { CreateBranchDto } from './create-branch.dto'

export class UpdateBranchDto extends CreateBranchDto {
  @IsNotEmpty()
  id: string;
}