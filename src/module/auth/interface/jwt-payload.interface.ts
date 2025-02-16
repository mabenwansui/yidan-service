import { ROLE } from '@/common/constants/role'

export interface JwtPayload {
  exp: number
  iat: number
  sub: string
  role: ROLE
  name: string
}
