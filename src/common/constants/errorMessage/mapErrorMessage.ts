import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorMessage/commonCode'

export const MAP_ERROR_MESSAGE = {
  GET_DISTRICT_CHILDREN_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.GET_DISTRICT_CHILDREN_ERROR,
    message: '获取地区信息失败, 请稍后重试'
  },
  GEO_TO_ADDRESS_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.GEO_TO_ADDRESS_ERROR,
    message: '获取地址信息失败, 请稍后重试'
  }
}
