import { HttpStatus } from '@nestjs/common'
import { ERROR_CODE } from '@/common/constants/errorCode'

export const COMMODITY_ERROR_MESSAGE = {
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: ERROR_CODE.NOT_FOUND,
    message: '请求的资源不存在'
  },
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.BAD_REQUEST,
    message: '请求参数错误'
  },
  CREATE_COMMODITY_CATEGORY_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.CREATE_COMMODITY_CATEGORY_ERROR,
    message: '创建失败, 服务器内部错误, 请联系管理员'
  },
  CREATE_NOT_FOUND_COMMODITY_CATEGORY_PARENT: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.NOT_FOUND_COMMODITY_CATEGORY_PARENT,
    message: '创建失败, 未查询到父级分类'
  },
  COMMODITY_CATEGORY_ALREADY_USED: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.COMMODITY_CATEGORY_ALREADY_USED,
    message: '创建失败, 分类名称已被使用'
  },
  UPDATE_COMMODITY_CATEGORY_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.UPDATE_COMMODITY_CATEGORY_ERROR,
    message: '更新错误, 未查询到此分类'
  },
  UPDATE_COMMODITY_CATEGORY_ROOT_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.UPDATE_COMMODITY_CATEGORY_ERROR,
    message: '更新错误, 根节点不能修改'
  },
  DELETE_NOT_FOUND_COMMODITY_CATEGORY: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.DELETE_COMMODITY_CATEGORY_ERROR,
    message: '删除错误, 未查询到此分类'
  },
  DELETE_COMMODITY_CATEGORY_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    code: ERROR_CODE.DELETE_COMMODITY_CATEGORY_ERROR,
    message: '删除错误, 服务器内部错误, 请联系管理员'
  }
}
