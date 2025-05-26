import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { CommodityService } from './commodity.service'
import { CreateCommodityDto } from './dto/create-commodity.dto'
import { SearchCommodityDto, FindOneCommodityDto } from './dto/find-commodity.dto'
import { UpdateCommodityDto } from './dto/update-commodity.dto'
import { DeleteCommodityDto } from './dto/delete-commodity.dto'
import { CommodityCreatedResponseDto } from './dto/commodity-created-response.dto'
import { CommodityFoundOneResponseDto, CommoditySearchResponseDto } from './dto/commodity-found-response.dto'

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: CommodityCreatedResponseDto })  
  @Auth(ROLE.ADMIN)
  @Post('create')
  async create(@Body() createCatDto: CreateCommodityDto): Promise<CommodityCreatedResponseDto> {
    return await this.commodityService.create(createCatDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('update')
  async update(@Body() updateCommodityDto: UpdateCommodityDto): Promise<Record<never, never>> {
    return await this.commodityService.update(updateCommodityDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('delete')
  async delete(@Body() deleteCommodityDto: DeleteCommodityDto): Promise<Record<never, never>> {
    return await this.commodityService.delete(deleteCommodityDto)
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: CommodityFoundOneResponseDto })  
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('get-info')
  async getCommodityById(@Body() foundCommodityDto: FindOneCommodityDto) {
    const { id } = foundCommodityDto
    return await this.commodityService.getInfo(id)
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: CommoditySearchResponseDto })    
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('search')
  async search(@Body() searchCommodityDto: SearchCommodityDto): Promise<CommoditySearchResponseDto> {
    return await this.commodityService.search(searchCommodityDto)
  }
}
