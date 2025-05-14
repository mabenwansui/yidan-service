import { IsString, IsNumber, IsDate, IsBoolean, IsNotEmpty } from 'class-validator'
import { CouponInterface, CouponType } from '../interface/coupon.interface'

export class CreateCouponDto implements CouponInterface {
  /** 优惠券名称 */
  @IsString()
  @IsNotEmpty()
  name: string

  /** 优惠券描述 */
  @IsString()
  @IsNotEmpty()
  description: string

  /** 优惠券折扣 */
  @IsNumber()
  discount: number

  /** 优惠券固定金额 */
  @IsNumber() 
  discountFixed?: number  

  /** 优惠券类型 */
  @IsString()
  @IsNotEmpty()
  type: CouponType

  /** 优惠券使用的最小金额 */
  @IsNumber()
  @IsNotEmpty()
  minAmount: number

  /** 优惠券生效日期 */
  @IsDate()
  @IsNotEmpty()
  validFrom: Date

  /** 优惠券失效日期 */
  @IsDate()
  @IsNotEmpty()
  validUntil: Date

  /** 优惠券是否激活 */
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean
}
