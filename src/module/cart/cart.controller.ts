import { Body, Controller, Post, Req } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { CartService } from './cart.service'
import { ChangeCartDto } from './dto/change-cart.dto'


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('update')
  async change(@Req() request, @Body() changeCartDto: ChangeCartDto) {
    return await this.cartService.update(changeCartDto, request.user.sub)
  }

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('delete')
  async delete(@Req() request) {
    return await this.cartService.delete(request.user.sub)
  }

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('list')
  async list(@Req() request) {    
    return await this.cartService.getList(request.user.sub)
  }
}
