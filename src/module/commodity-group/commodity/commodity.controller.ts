import { Body, Controller, Post } from '@nestjs/common'
import { CreateCommodityDto } from './dto/create-commodity.dto'
import { SearchCommodityDto } from './dto/search-commodity.dto'
import { CommodityService } from './commodity.service'
import { UpdateCommodityDto } from './dto/update-commodity.dto'
import { DeleteCommodityDto } from './dto/delete-commodity.dto'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'


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
  async getCommodityById(@Body() { id }: { id: string }) {
    return await this.commodityService.findById(id)
  }

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('search')
  async search(@Body() searchCommodityDto: SearchCommodityDto) {
    return await this.commodityService.search(searchCommodityDto)
  }
}
