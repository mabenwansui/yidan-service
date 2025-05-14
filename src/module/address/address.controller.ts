import { Body, Controller, Post, Req } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('create')
  async create(@Body() createAddressDto: CreateAddressDto, @Req() request) {
    return await this.addressService.create(createAddressDto, request.user.sub)
  }

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('update')
  async update(@Body() updateAddressDto: UpdateAddressDto, @Req() request) {
    return await this.addressService.update(updateAddressDto, request.user.sub)
  }

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('list')
  async getList(@Req() request) {
    return await this.addressService.search({
      userId: request.user.sub
    })
  }
}
