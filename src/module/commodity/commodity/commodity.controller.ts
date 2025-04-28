import { Body, Controller, Post } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { CommodityService } from './commodity.service'
import { CreateCommodityDto } from './dto/create-commodity.dto'
import { SearchCommodityDto } from './dto/search-commodity.dto'
import { UpdateCommodityDto } from './dto/update-commodity.dto'
import { DeleteCommodityDto } from './dto/delete-commodity.dto'
import { FoundCommodityDto } from './dto/found-commodity.dto'


@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @Auth(ROLE.ADMIN)
  @Post('create')
  async create(@Body() createCatDto: CreateCommodityDto) {
    return await this.commodityService.create(createCatDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('update')
  async update(@Body() updateCommodityDto: UpdateCommodityDto) {
    return await this.commodityService.update(updateCommodityDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('delete')
  async delete(@Body() deleteCommodityDto: DeleteCommodityDto) {
    return await this.commodityService.delete(deleteCommodityDto)
  }

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('get-info')
  async getCommodityById(@Body() foundCommodityDto: FoundCommodityDto) {
    const { id } = foundCommodityDto
    return await this.commodityService.getInfo(id)
  }

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('search')
  async search(@Body() searchCommodityDto: SearchCommodityDto) {
    return await this.commodityService.search(searchCommodityDto)
  }
}
