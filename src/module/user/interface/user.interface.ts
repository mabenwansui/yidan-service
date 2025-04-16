import { ROLE } from '@/common/constants/role'
export interface UserInterface {
  id: string // 用户ID
  username: string // 用户名
  nickname?: string // 昵称
  email?: string // 邮箱
  phoneNumber?: string // 手机号
  role: ROLE[]
}
