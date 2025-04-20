import { Injectable, HttpException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { provincial } from './data/district.data'
import { CityItem, ResponseDistrictForTianDiTu } from './interface/map.interface'
import { TianDiTuService } from './service/tianditu.service'

@Injectable()
export class MapService {
  constructor(private readonly tianDiTuService: TianDiTuService) {}

  async getchildren(keyword: string): Promise<CityItem[]> {
    const res = await this.tianDiTuService.getchildren(keyword)
    return res
  }
}
