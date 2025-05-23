import {
  Body,
  Controller,
  Post,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
  SerializeOptions
} from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { DeleteAddressDto } from './dto/delete-address.dto'
import { GetAddressDto } from './dto/get-address.dto'
import { SearchAddressResponseDto } from './dto/search-address-response.dto'
import { FoundAddressResponseDto } from './dto/found-address-response.dto'

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
  @Post('delete')
  async delete(@Body() deleteAddressDto: DeleteAddressDto, @Req() request) {
    const { id } = deleteAddressDto
    return await this.addressService.delete(id, request.user.sub)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: FoundAddressResponseDto })
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('get-info')
  async getInfo(@Body() getAddressDto: GetAddressDto, @Req() request) {
    const { id } = getAddressDto
    return await this.addressService.getInfo(id, request.user.sub)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: 'excludeAll',
    type: SearchAddressResponseDto
  })
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('list')
  async getList(@Req() request) {
    return await this.addressService.search({ userId: request.user.sub })
  }
}
