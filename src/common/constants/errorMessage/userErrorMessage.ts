import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorCode'

export const USER_ERROR_MESSAGE = {
  LOGIN_FAILURE: {
    status: HttpStatus.UNAUTHORIZED,
    code: ERROR_CODE.LOGIN_FAILURE,
    message: '登录失败, 用户名或密码错误'
  },
  AUTH_CHECK_ERROR: {
    status: HttpStatus.UNAUTHORIZED,
    code: ERROR_CODE.AUTH_CHECK_ERROR,
    message: '权限校验失败, 请重新登录'
  },
  AUTH_REFRESH_CHECK_ERROR: {
    status: HttpStatus.UNAUTHORIZED,
    code: ERROR_CODE.AUTH_REFRESH_CHECK_ERROR,
    message: '权限校验失败, 请重新登录'
  },
  AUTH_NOT_PERMISSION: {
    status: HttpStatus.FORBIDDEN,
    code: ERROR_CODE.AUTH_NOT_PERMISSION,
    message: '无访问权限'
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
  CREATE_USER_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: ERROR_CODE.CREATE_USER_ERROR,
    message: '创建用户失败, 服务器内部错误，请联系管理员'
  },
  USER_ALREADY_USED: {
    status: HttpStatus.CONFLICT,
    code: ERROR_CODE.USER_ALREADY_USED,
    message: '用户名已存在'
  },
  USER_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: ERROR_CODE.USER_NOT_FOUND,
    message: '用户不存在, 请重新登录'
  },
  DELETE_SUPER_ADMIN_ERROR: {
    status: HttpStatus.FORBIDDEN,
    code: ERROR_CODE.DELETE_SUPER_ADMIN_ERROR,
    message: '不能删除超级管理员'
  },
  DELETE_USER_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: ERROR_CODE.DELETE_USER_ERROR,
    message: '删除用户失败, 服务器内部错误，请联系管理员'
  },
  UPDATE_USER_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: ERROR_CODE.UPDATE_USER_ERROR,
    message: '更新用户信息失败, 服务器内部错误，请联系管理员'
  }
}
