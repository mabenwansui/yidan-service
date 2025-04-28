import { PageBaseDto } from '@/common/dto/page-base.dto'
import { BranchInterface } from '../interface/branch.interface'

export class BranchSearchedResponseDto extends PageBaseDto {
  list: BranchInterface[]
}
