import { Expose, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'

export class BranchCreatedResponseDto {
  @Expose()
  @Transform(toId)
  id?: string
}
