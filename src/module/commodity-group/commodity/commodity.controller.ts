import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CreateCommodityDto } from './dto/createCommodity.dto'
import { SearchCommodityDto } from './dto/searchCommodity.dto'
import { CommodityService } from './commodity.service'
import { UpdateCommodityDto } from './dto/updateCommodity.dto'
import { JwtAdminGuard } from '@/module/auth/jwt-admin.guard'

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @Post('create')
  @UseGuards(JwtAdminGuard)
  async create(@Body() createCatDto: CreateCommodityDto) {
    return await this.commodityService.create(createCatDto)
  }

  @Post('update')
  @UseGuards(JwtAdminGuard)
  async update(@Body() updateCommodityDto: UpdateCommodityDto) {
    return await this.commodityService.update(updateCommodityDto)
  }

  @Post('delete')
  async delete() {}

  @Post('search')
  @UseGuards(JwtAdminGuard)
  async search(@Body() searchCommodityDto: SearchCommodityDto) {
    return await this.commodityService.search(searchCommodityDto)
  }
}
