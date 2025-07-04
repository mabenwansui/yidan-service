import { OmitType } from '@nestjs/mapped-types'
import { Expose, Type, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'
import { PageBaseResponseDto } from '@/common/dto/page-base.dto'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { StoreFoundOneResponseDto } from '@/module/store/store/dto/store-found-response.dto'
import { BranchFoundOneByStoreResponseDto } from '@/module/store/branch/dto/branch-found-response.dto'
import { CouponFoundResponse } from '@/module/coupon/dto/coupon-found-response'
import { Order } from '../schemas/order.schema'

class OrderCommoditysDto {
  @Expose()
  @Type(() => BranchFoundOneByStoreResponseDto)
  branch: BranchFoundOneByStoreResponseDto

  @Expose()
  quantity: number
}

export class OrderFoundOneResponseDto extends OmitType(Order, []) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  orderId: string

  @Expose()
  @Type(() => UserFoundOneResponseDto)
  user: UserFoundOneResponseDto

  @Expose()
  @Type(() => StoreFoundOneResponseDto)
  store: StoreFoundOneResponseDto

  @Expose()
  orderType: Order['orderType']

  @Expose()
  orderStatus: Order['orderStatus']

  @Expose()
  @Type(() => CouponFoundResponse)
  coupon: CouponFoundResponse[]

  @Expose()
  originalAmount: number

  @Expose()
  actualAmount: number

  @Expose()
  paymentType: Order['paymentType']

  @Expose()
  paymentStatus: Order['paymentStatus']

  @Expose()
  tableNumber?: string

  @Expose()
  completedAt?: Date

  @Expose()
  remark?: string

  @Expose()
  payAt?: Date

  @Expose()
  @Type(() => OrderCommoditysDto)
  commoditys: OrderCommoditysDto[]
}

export class OrderSearchResponseDto extends PageBaseResponseDto {
  @Expose()
  @Type(() => OrderFoundOneResponseDto)
  list: OrderFoundOneResponseDto[]
}