import { Injectable, HttpException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'

interface GeoToAddressProps {
  location: {
    lon: number
    lat: number
  }
}

export interface GeoToAddressResponse {
  address: string
  formatted_addresses: {
    recommend: string
    rough: string
    standard_address: string
  }
  address_component: {
    nation: string
    province: string
    city: string
    district: string
    street: string
    street_number: string
  }
  ad_info: {
    nation_code: string
    adcode: string
    city_code: string
    phone_area_code: string
    name: string
    nation: string
    province: string
    city: string
    district: string
  }
}

@Injectable()
export class TencentService {
  constructor(private readonly httpService: HttpService) {}
  async geoToAddress(props: GeoToAddressProps): Promise<GeoToAddressResponse> {
    const { location: { lon, lat } } = props
    /**
     * 腾讯地图逆地址解析
     * API文档：https://lbs.qq.com/service/webService/webServiceGuide/address/Gcoder
     */
    const { status, data } = await firstValueFrom(
      this.httpService.get<{
        data: GeoToAddressResponse
      }>('https://apis.map.qq.com/ws/geocoder/v1', {
        params: {
          key: process.env.MAP_TENCENT_KEY,
          location: `${lat},${lon}`,
        }
      })
    )
    if (status === 200) {
      return data.data
    } else {
      throw new HttpException(
        ERROR_MESSAGE.GEO_TO_ADDRESS_ERROR.message,
        ERROR_MESSAGE.GEO_TO_ADDRESS_ERROR.status
      )
    }
  }
}
