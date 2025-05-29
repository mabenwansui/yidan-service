import { Injectable, HttpException } from '@nestjs/common'
import { CityItem } from './interface/map.interface'
import { TianDiTuService } from './service/tianditu.service'
import { TencentService } from './service/tencent.service'

@Injectable()
export class MapService {
  constructor(
    private readonly tianDiTuService: TianDiTuService,
    private readonly tencentService: TencentService
  ) {}

  async getchildren(keyword: string): Promise<CityItem[]> {
    const res = await this.tianDiTuService.getDistrictChildren(keyword)
    return res
  }

  async geoToAddress({ lon, lat }) {
    const res = await this.tencentService.geoToAddress({ location: { lon, lat } })
    return res
  }
}
