import { UserInterface } from '../interface/user.interface'
import { ROLE } from '@/common/constants/role'
import { Types } from 'mongoose';

export class UserFoundOneResponseDto implements UserInterface {
  _id: Types.ObjectId
  username: string
  email?: string
  role: ROLE[]
}
