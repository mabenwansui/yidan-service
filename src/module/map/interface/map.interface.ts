// 定义行政区划数据类型
export interface CityItem {
  name: string // 行政区划名称
  gb: string // GB 码
  pgb?:string // 父级 GB 码
  level?: number // 级别
}

interface Point {
  lat: number // 纬度
  lng: number // 经度
}

type TianDiTuChild = CityItem & {
  center: Point
  level: number
}

export interface ResponseDistrictForTianDiTu {
  district: {
    children: TianDiTuChild[]
  }[]
}