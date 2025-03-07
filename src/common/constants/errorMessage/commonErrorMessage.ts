import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorCode'

export const COMMON_ERROR_MESSAGE = {
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: ERROR_CODE.NOT_FOUND,
    message: '请求的资源不存在'
  },
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.BAD_REQUEST,
    message: '请求参数错误'
  }
}
