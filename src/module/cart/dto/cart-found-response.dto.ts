import { OmitType } from '@nestjs/mapped-types'
import { Expose, Type, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'
import { BranchFoundOneByStoreResponseDto } from '@/module/store/branch/dto/branch-found-response.dto'
import { Cart } from '../schemas/cart.schema'

class Item {
  @Expose()
  @Type(() => BranchFoundOneByStoreResponseDto)
  branch: BranchFoundOneByStoreResponseDto

  @Expose()
  quantity: number
}

export class CartFoundResponseDto extends OmitType(Cart, []) {
  @Expose()
  @Type(() => Item)
  list: Item[]
}
