import { ROLE } from '@/common/constants/role'
export interface UserInterface {
  id?: string // 数据库自增id
  userId?: string // 简短的用户ID, 用于显示、登录信息
  username?: string // 用户名
  nickname?: string // 昵称
  email?: string // 邮箱
  phoneNumber?: string // 手机号
  role?: ROLE[]
}
