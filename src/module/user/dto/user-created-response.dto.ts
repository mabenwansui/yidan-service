import { ROLE } from '@/common/constants/role'
import { Expose, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'

export class UserCreatedResponseDto {
  @Expose()
  @Transform(toId)
  id?: string  

  @Expose()
  role: ROLE[]
}
