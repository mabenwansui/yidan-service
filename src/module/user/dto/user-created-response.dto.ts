import { ROLE } from '@/common/constants/role'
import { User } from '../interface/user.interface'

export class UserCreatedResponseDto implements User {
  id: string // 用户ID
  username: string // 用户名
  email?: string // 邮箱
  phoneNumber?: string // 手机号
  role: ROLE
}
