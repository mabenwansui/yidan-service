import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorMessage/commonCode'

export const ORDER_ERROR_MESSAGE = {
  CREATE_ORDER_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.CREATE_ORDER_ERROR,
    message: '创建失败'
  },
  CREATE_ORDER_UNIQUE_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.CREATE_ORDER_UNIQUE_ERROR,
    message: '创建失败, 该订单已存在'
  },
  UPDATE_ORDER_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.UPDATE_ORDER_ERROR,
    message: '更新错误, 请联系管理员'
  },
  FOUND_ORDER_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.FOUND_ORDER_ERROR,
    message: '查询错误, 未找到订单'
  }
}
