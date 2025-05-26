import { Post, Controller, Body } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { MapService } from './map.service'
import { GetChildrenDto } from './dto/get-children.dto'

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Auth()
  @Post('district/getchildren')
  async getUserInfo(@Body() getChildrenDto: GetChildrenDto) {
    const { keyword } = getChildrenDto
    return await this.mapService.getchildren(keyword)
  }
}
