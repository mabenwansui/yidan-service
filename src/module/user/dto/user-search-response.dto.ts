import { UserInterface } from '../interface/user.interface'

export class UserSearchResponseDto {
  list: UserInterface[]
  total: number
  pageSize: number
  curPage: number
}