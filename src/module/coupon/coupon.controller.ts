import { Post, Controller, Body, Req } from '@nestjs/common'
import { CreateCouponDto } from './dto/create-coupon.dto'
import { OrderService } from './coupon.service'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'

@Controller('coupon')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('create')
  async createCoupon(@Req() request, @Body() createCouponDto: CreateCouponDto) {
    return await this.orderService.createCoupon(createCouponDto, request.user.sub)
  }
}
