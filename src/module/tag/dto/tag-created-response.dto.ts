import { Expose, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'

export class TagCreatedResponseDto {
  @Expose()
  @Transform(toId)
  id?: string
}
