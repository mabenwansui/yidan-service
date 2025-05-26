import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export enum CouponType {
  DISCOUNT = 'DISCOUNT', // 折扣券
  FIXED = 'FIXED', // 固定金额券
  FREE_SHIPPING = 'FREE_SHIPPING' // 免运费券
}

// 定义优惠券文档类型
export type CouponDocument = HydratedDocument<Coupon>

// 定义优惠券类
@Schema({ timestamps: true })
export class Coupon {
  @Prop({ required: true })
  name: string // 优惠券名称

  @Prop({ required: true })
  description: string // 优惠券描述

  @Prop({ required: true })
  discount: number // 折扣比例

  @Prop({ required: true })
  discountFixed: number // 折扣比例

  @Prop({ required: true, type: String, enum: CouponType })
  type: CouponType // 优惠券类型，如满减、折扣等

  @Prop({ required: true })
  minAmount: number // 最低消费金额

  @Prop({ required: true })
  validFrom: Date // 有效期开始时间

  @Prop({ required: true })
  validUntil: Date // 有效期结束时间

  @Prop({ required: true })
  isActive: boolean // 优惠券是否可用
}

// 创建优惠券模式
export const CouponSchema = SchemaFactory.createForClass(Coupon)
