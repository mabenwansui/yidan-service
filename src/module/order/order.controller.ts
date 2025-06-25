import {
  Post,
  Controller,
  Body,
  Req,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { ROLE } from '@/common/constants/role'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { OrderService } from './service/order.service'
import { PayService } from './service/pay.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { SubmitOrderDto } from './dto/submit-order.dto'
import { SearchOrderDto, FindOneOrderDto, AdminSearchArchivedOrderDto } from './dto/find-order.dto'
import { OrderFoundOneResponseDto, OrderSearchResponseDto } from './dto/order-found-response.dto'
import { UpdateStageDto } from './dto/update-order.dto'
import { PayDto } from './dto/pay.dto'

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly payService: PayService
  ) {}

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

  @Auth(ROLE.USER)
  @Post('pay')
  async pay(@Req() request, @Body() payDto: PayDto) {
    return await this.payService.pay(payDto, request.user.sub)
  }

  @Auth(ROLE.ADMIN)
  @Post('update-stage')
  async updateStage(@Req() request, @Body() updateStage: UpdateStageDto) {
    await this.orderService.updateStage(updateStage)
    return {}
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: OrderSearchResponseDto })
  @Auth(ROLE.USER)
  @Post('list')
  async getOrderInfo(@Body() searchOrderDto: SearchOrderDto) {
    return await this.orderService.search(searchOrderDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: OrderSearchResponseDto })
  @Auth(ROLE.ADMIN)
  @Post('admin/list')
  async getAdminOrderList(@Body() searchOrderDto: SearchOrderDto) {
    return await this.orderService.adminSearch(searchOrderDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: OrderSearchResponseDto })
  @Auth(ROLE.ADMIN)
  @Post('admin/list-archived')
  async getAdminOrderInfo(@Body() searchOrderDto: AdminSearchArchivedOrderDto) {
    return await this.orderService.adminSearchArchived(searchOrderDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: OrderFoundOneResponseDto })
  @Auth(ROLE.USER)
  @Post('get-info')
  async getOrder(@Req() request, @Body() findOneOrderDto: FindOneOrderDto) {
    const { orderId } = findOneOrderDto
    return await this.orderService.findOne({ _id: orderId, user: request.user.sub })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: OrderFoundOneResponseDto })
  @Auth(ROLE.ADMIN)
  @Post('admin/get-info')
  async getAdminOrder(@Req() request, @Body() findOneOrderDto: FindOneOrderDto) {
    const { orderId } = findOneOrderDto
    return await this.orderService.findOne({ _id: orderId })
  }
}
