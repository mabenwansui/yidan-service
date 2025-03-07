import { COMMON_ERROR_MESSAGE } from './commonErrorMessage'
import { COMMODITY_ERROR_MESSAGE } from './commodityErrorMessage'
import { FILE_ERROR_MESSAGE } from './fileErrorMessage'
import { USER_ERROR_MESSAGE } from './userErrorMessage'

export const ERROR_MESSAGE = {
  ...COMMON_ERROR_MESSAGE,
  ...FILE_ERROR_MESSAGE,
  ...USER_ERROR_MESSAGE,
  ...COMMODITY_ERROR_MESSAGE
}
