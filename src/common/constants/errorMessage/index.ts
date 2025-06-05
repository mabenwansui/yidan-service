import { COMMON_ERROR_MESSAGE } from './commonErrorMessage'
import { COMMODITY_ERROR_MESSAGE } from './commodityErrorMessage'
import { FILE_ERROR_MESSAGE } from './fileErrorMessage'
import { USER_ERROR_MESSAGE } from './userErrorMessage'
import { MAP_ERROR_MESSAGE } from './mapErrorMessage'
import { ADDRESS_ERROR_MESSAGE } from './addressErrorMessage'
import { BRANCH_ERROR_MESSAGE } from './branchErrorMessage'
import { TAG_ERROR_MESSAGE } from './tagErrorMessage'

export const ERROR_MESSAGE = {
  ...COMMON_ERROR_MESSAGE,
  ...BRANCH_ERROR_MESSAGE,
  ...FILE_ERROR_MESSAGE,
  ...USER_ERROR_MESSAGE,
  ...COMMODITY_ERROR_MESSAGE,
  ...MAP_ERROR_MESSAGE,
  ...ADDRESS_ERROR_MESSAGE,
  ...TAG_ERROR_MESSAGE
}
