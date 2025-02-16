import { User } from '../interface/user.interface'
import { ROLE } from '@/common/constants/role'
export class UserFoundOneResponseDto implements User {
  id: string
  username: string
  email?: string
  role: ROLE
}
