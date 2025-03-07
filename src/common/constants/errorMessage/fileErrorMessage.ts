import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorCode'

export const FILE_ERROR_MESSAGE = {
  UPLOAD_IMAGE_MIMETYPE_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.UPLOAD_IMAGE_MIMETYPE_ERROR,
    message: '上传图片格式不正确, 仅支持jpg, png, gif'
  },
  UPLOAD_IMAGE_SIZE_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.UPLOAD_IMAGE_SIZE_ERROR,
    message: '上传图片尺寸太大, 不能超过5M'
  }
}
