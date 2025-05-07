import { Injectable, HttpException } from '@nestjs/common'
import { CityItem } from './interface/map.interface'
import { TianDiTuService } from './service/tianditu.service'

@Injectable()
export class MapService {
  constructor(private readonly tianDiTuService: TianDiTuService) {}

  async getchildren(keyword: string): Promise<CityItem[]> {
    const res = await this.tianDiTuService.getchildren(keyword)
    return res
  }
}
