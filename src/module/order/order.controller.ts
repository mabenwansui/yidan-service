import {
  Post,
  Controller,
  Body,
  Req,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { SubmitOrderDto } from './dto/submit-order.dto'
import { SearchOrderDto, FindOneOrderDto } from './dto/find-order.dto'
import { OrderFoundOneResponseDto } from './dto/order-found-response.dto'
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

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('submit')
  async submitOrder(@Req() request, @Body() submitDto: SubmitOrderDto) {
    return await this.orderService.submitOrder(submitDto, request.user.sub)
  }

  @Auth(ROLE.ADMIN)
  @Post('list')
  async getOrderInfo(@Body() searchOrderDto: SearchOrderDto) {
    return await this.orderService.getOrderList(searchOrderDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: OrderFoundOneResponseDto })
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('get-info')
  async getOrder(@Body() findOneOrderDto: FindOneOrderDto): Promise<OrderFoundOneResponseDto> {
    const { orderId } = findOneOrderDto
    return await this.orderService.getOrder(orderId)
  }
}
