import { User } from '../interface/user.interface'
export class UserFoundOneResponseDto implements User {
  id: string
  username: string
  password: string
  email?: string // 邮箱
}
