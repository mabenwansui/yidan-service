import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorMessage/commonCode'

export const TAG_ERROR_MESSAGE = {
  CREATE_TAG_UNIQUE_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.CREATE_TAG_UNIQUE_ERROR,
    message: '创建失败, 该标签已存在'
  }
}
