import { ROLE } from '@/common/constants/role'
export interface User {
  id: string // 用户ID
  username: string // 用户名
  password: string // 密码
  email?: string // 邮箱
  role: ROLE
}
