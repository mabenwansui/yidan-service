import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorMessage/commonCode'

export const ADDRESS_ERROR_MESSAGE = {
  CREATE_ADDRESS_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.CREATE_ADDRESS_ERROR,
    message: '创建地址失败, 请联系管理员'
  },
  UPDATE_ADDRESS_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.UPDATE_ADDRESS_ERROR,
    message: '更新地址失败, 请联系管理员'
  },
  DELETE_ADDRESS_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.DELETE_ADDRESS_ERROR,
    message: '删除地址失败, 请联系管理员'
  },
  GET_ADDRESS_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.GET_ADDRESS_ERROR,
    message: '获取地址失败, 请联系管理员'
  }
}
