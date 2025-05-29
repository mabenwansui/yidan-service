import { Post, Controller, Body } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { MapService } from './map.service'
import { GetChildrenDto } from './dto/get-district-children.dto'
import { GetGeoToAdressDto } from './dto/get-geo-to-adress.dto'

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Auth()
  @Post('district/getchildren')
  async getUserInfo(@Body() getChildrenDto: GetChildrenDto) {
    const { keyword } = getChildrenDto
    return await this.mapService.getchildren(keyword)
  }

  @Post('geo-to-address')
  async geoToAddress(@Body() getGeoToAdressDto: GetGeoToAdressDto) {
    return await this.mapService.geoToAddress(getGeoToAdressDto)
  }
}
