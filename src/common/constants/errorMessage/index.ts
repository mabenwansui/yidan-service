import { HttpStatus } from '@nestjs/common'
import { ErrorCode } from '@/common/constants/errorCode'

export const ERROR_MESSAGE = {
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    code: ErrorCode.BAD_REQUEST,
    message: '请求参数错误',
  },
  LOGIN_FAILURE: {
    status: HttpStatus.UNAUTHORIZED,
    code: ErrorCode.LOGIN_FAILURE,
    message: '登录失败, 用户名或密码错误',
  },
  AUTH_CHECK_FAILED: {
    status: HttpStatus.UNAUTHORIZED,
    code: ErrorCode.AUTH_CHECK_FAILED,
    message: '权限校验失败, 请重新登录',
  },
  CAPTCHA_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    code: ErrorCode.CAPTCHA_NOT_FOUND,
    message: '验证码已过期',
  },
  CAPTCHA_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ErrorCode.CAPTCHA_ERROR,
    message: '验证码错误, 请重新输入',
  },
  CREATE_USER_FAILED: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: ErrorCode.CREATE_USER_FAILED,
    message: '创建用户失败, 服务器内部错误，请联系管理员',
  },
  USER_ALREADY_USED: {
    status: HttpStatus.CONFLICT,
    code: ErrorCode.USER_ALREADY_USED,
    message: '用户名已存在',
  },
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: ErrorCode.NOT_FOUND,
    message: '请求的资源不存在',
  },
}
