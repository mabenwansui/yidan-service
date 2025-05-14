import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { CouponInterface } from './interface/coupon.interface'
import { Coupon } from './schemas/coupon.schema'
import { CreateCouponDto } from './dto/create-coupon.dto'
import { MessageService } from '@/module/message/message.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Coupon.name)
    private readonly orderModel: Model<Coupon>,
    private readonly messageService: MessageService
  ) {}

  async createCoupon(createOrderDto: CreateCouponDto, userId: string): Promise<any> {

  }

  async updateCoupon(): Promise<any> {

  }
}
