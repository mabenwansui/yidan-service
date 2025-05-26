import { Expose, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'

export class StoreCreatedResponseDto {
  @Expose()
  @Transform(toId)
  id?: string
}
