import { HttpStatus, HttpException } from '@nestjs/common'

export const ERROR_MESSAGE = {
  CREATE_USER_FAILED: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '创建用户失败, 服务器内部错误，请联系管理员',
  },
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    message: '请求参数错误',
  },
  LOGIN_FAILURE: {
    status: HttpStatus.UNAUTHORIZED,
    message: '登录失败, 用户名或密码错误',
  },
  AUTH_CHECK_FAILED: {
    status: HttpStatus.UNAUTHORIZED,
    message: '权限校验失败, 请重新登录',
  }
}
