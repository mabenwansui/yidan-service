import { Expose, Transform } from 'class-transformer'
import { Commodity } from '../schemas/commodity.schema'
import { toId } from '@/common/utils/transform'

export class CommodityCreatedResponseDto extends Commodity {
  @Expose()
  @Transform(toId)
  id: string
}
