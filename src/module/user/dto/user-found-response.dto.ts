import { UserInterface } from '../interface/user.interface'
import { ROLE } from '@/common/constants/role'
export class UserFoundOneResponseDto implements UserInterface {
  id: string
  username: string
  email?: string
  role: ROLE[]
}
