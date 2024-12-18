import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common'
import { CreateCommodityDto } from './dto/createCommodity.dto'
import { CommodityService } from './commodity.service'
import { Commodity } from './schemas/commodity.schema'

@Controller('commodity')
export class CommodityController {
  constructor(private readonly catsService: CommodityService) {}

  @Post()
  async create(@Body() createCatDto: CreateCommodityDto) {
    const rb = await this.catsService.create(createCatDto)
    console.log('rb', rb)
    return rb
  }

  @Get()
  async findAll(): Promise<Commodity[]> {
    const rb = await this.catsService.findAll()
    return rb
  }

  @Get(':name')
  async findOne(@Param('name', ParseIntPipe) name: number): Promise<any> {
    return this.catsService.findOne(name);
  }

  // @Post(':id')
  // async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return this.catsService.update(id, updateCatDto);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.catsService.delete(id);
  // }
}
