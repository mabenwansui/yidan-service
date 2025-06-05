import {
  Body,
  Controller,
  Post,
  Req,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { CartService } from './cart.service'
import { ChangeCartDto } from './dto/change-cart.dto'
import { CartFoundResponseDto } from './dto/cart-found-response.dto'

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

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: CartFoundResponseDto })
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('list')
  async list(@Req() request): Promise<CartFoundResponseDto> {
    return await this.cartService.getList(request.user.sub) as any
  }
}
// : Promise<CartFoundResponseDto>
