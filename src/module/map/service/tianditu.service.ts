import { Injectable, HttpException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { provincial } from '../data/district.data'
import { CityItem, ResponseDistrictForTianDiTu } from '../interface/map.interface'

@Injectable()
export class TianDiTuService {
  constructor(private readonly httpService: HttpService) {}

  async getDistrictChildren(keyword: string): Promise<CityItem[]> {
    if (!keyword) {
      return provincial
    } else {
      /**
       * 调用天地图行政区域查询 API，获取指定关键词对应的下级行政区域信息。
       * API文档：http://lbs.tianditu.gov.cn/server/administrative2.html
       */
      const { status, data } = await firstValueFrom(
        this.httpService.get<{
          data: ResponseDistrictForTianDiTu
        }>('https://api.tianditu.gov.cn/v2/administrative', {
          params: {
            tk: process.env.MAP_TIANDITU_KEY,
            keyword: keyword,
            childLevel: 1
          }
        })
      )
      if (status === 200) {
        return data.data.district[0].children.map((item)=> ({
          name: item.name,
          gb: item.gb,
          pgb: item.pgb,
          level: item.level
        }))
      } else {
        throw new HttpException(
          ERROR_MESSAGE.GET_DISTRICT_CHILDREN_ERROR.message,
          ERROR_MESSAGE.GET_DISTRICT_CHILDREN_ERROR.status
        )
      }
    }
  }
}
