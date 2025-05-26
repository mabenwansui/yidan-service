import { OmitType } from '@nestjs/mapped-types'
import { Expose, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'
import { Coupon } from '../schemas/coupon.schema'

export class CouponFoundResponse extends OmitType(Coupon, []) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  name: string

  @Expose()
  description: string

  @Expose()
  discount: number

  @Expose()
  discountFixed: number

  @Expose()
  type: Coupon['type']

  @Expose()
  minAmount: number

  @Expose()
  validFrom: Date

  @Expose()
  validUntil: Date

  @Expose()
  isActive: boolean
}
