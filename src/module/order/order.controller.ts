import { Post, Controller, Body, Req } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrderService } from './order.service'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('create')
  async createOrder(@Req() request, @Body() createDto: CreateOrderDto) {
    return await this.orderService.createOrder(createDto, request.user.sub)
  }

  @Post('test')
  async test() {
    return await this.orderService.test()
  }

  // @Auth(ROLE.ADMIN, ROLE.USER)
  // @Post('list')
  // async getOrderInfo(@Req() request) {
  //   const orderId = request.query.orderId // 假设通过查询参数传递订单ID
  //   return await this.orderService.getOrderInfo(orderId)
  // }
}
