export enum CouponType {
  DISCOUNT = 'DISCOUNT', // 折扣券
  FIXED = 'FIXED', // 固定金额券
  FREE_SHIPPING = 'FREE_SHIPPING' // 免运费券
}

// 定义优惠券接口
export interface CouponInterface {
  name: string // 优惠券名称
  description: string // 优惠券描述
  type: CouponType // 优惠券类型，如满减、折扣等
  discount?: number // 折扣比例
  discountFixed?: number // 固定金额
  minAmount: number // 最低消费金额
  validFrom: Date // 有效期开始时间
  validUntil: Date // 有效期结束时间
  isActive: boolean // 优惠券是否可用
}
