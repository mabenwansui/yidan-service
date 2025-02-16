import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CreateCommodityDto } from './dto/createCommodity.dto'
import { CommodityService } from './commodity.service'
import { JwtAdminGuard } from '@/module/auth/jwt-admin.guard'

@Controller('commodity')
export class CommodityController {
  constructor(private readonly catsService: CommodityService) {}

  @Post('create')
  @UseGuards(JwtAdminGuard)
  async create(@Body() createCatDto: CreateCommodityDto) {
    return await this.catsService.create(createCatDto)
  }

  // @Get()
  // @UseGuards(JwtAdminGuard)
  // async findAll(): Promise<Commodity[]> {
  //   const rb = await this.catsService.findAll()
  //   return rb
  // }

  // @Get(':name')
  // @UseGuards(JwtAdminGuard)
  // async findOne(@Param('name', ParseIntPipe) name: number): Promise<any> {
  //   return this.catsService.findOne(name)
  // }

  // @Post(':id')
  // async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return this.catsService.update(id, updateCatDto);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.catsService.delete(id);
  // }
}
