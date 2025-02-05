export enum ErrorCode {
  /** 请求资源不存在 */
  NOT_FOUND = '10001',
  /** 请求参数错误 */
  BAD_REQUEST = '10011',
  /** 登录失败, 用户名或密码错误 */
  LOGIN_FAILURE = '10101',
  /** 权限校验失败, 请重新登录 */
  AUTH_CHECK_FAILED = '10111',
  /** 权限校验失败, 请重新登录 */
  AUTH_REFRESH_CHECK_FAILED = '10112',
  /** 验证码已过期 */
  CAPTCHA_NOT_FOUND = '10121',
  /** 验证码错误, 请重新输入 */
  CAPTCHA_ERROR = '10122',
  /** 创建用户失败, 服务器内部错误，请联系管理员 */
  CREATE_USER_FAILED = '10201',
  /** 用户名已存在 */
  USER_ALREADY_USED = '10202',
  /** 请求参数错误DTO */
  BAD_REQUEST_DTO = '11001',
}
