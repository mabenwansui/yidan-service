import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorMessage/commonCode'

export const BRANCH_ERROR_MESSAGE = {
  CREATE_BRANCH_UNIQUE_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.CREATE_BRANCH_UNIQUE_ERROR,
    message: '创建失败, 该商品已存在'
  }
}
