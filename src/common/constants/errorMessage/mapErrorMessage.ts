import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorCode'

export const MAP_ERROR_MESSAGE = {
  GET_DISTRICT_CHILDREN_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.GET_DISTRICT_CHILDREN_ERROR,
    message: '获取地区信息失败, 请稍后重试'
  }
}
