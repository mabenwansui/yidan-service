import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorCode'

export const ERROR_MESSAGE = {
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.BAD_REQUEST,
    message: '请求参数错误'
  },
  LOGIN_FAILURE: {
    status: HttpStatus.UNAUTHORIZED,
    code: ERROR_CODE.LOGIN_FAILURE,
    message: '登录失败, 用户名或密码错误'
  },
  AUTH_CHECK_FAILED: {
    status: HttpStatus.UNAUTHORIZED,
    code: ERROR_CODE.AUTH_CHECK_FAILED,
    message: '权限校验失败, 请重新登录'
  },
  AUTH_REFRESH_CHECK_FAILED: {
    status: HttpStatus.UNAUTHORIZED,
    code: ERROR_CODE.AUTH_REFRESH_CHECK_FAILED,
    message: '权限校验失败, 请重新登录'
  },
  CAPTCHA_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.CAPTCHA_NOT_FOUND,
    message: '验证码已过期'
  },
  CAPTCHA_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.CAPTCHA_ERROR,
    message: '验证码错误, 请重新输入'
  },
  CREATE_USER_FAILED: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: ERROR_CODE.CREATE_USER_FAILED,
    message: '创建用户失败, 服务器内部错误，请联系管理员'
  },
  USER_ALREADY_USED: {
    status: HttpStatus.CONFLICT,
    code: ERROR_CODE.USER_ALREADY_USED,
    message: '用户名已存在'
  },
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: ERROR_CODE.NOT_FOUND,
    message: '请求的资源不存在'
  },
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
