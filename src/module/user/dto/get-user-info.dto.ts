import { IsNotEmpty } from 'class-validator'

export class GetUserInfoDto {
  @IsNotEmpty({ message: 'username不能为空' })
  username?: string // 用户名
}

export class GetUserInfoByIdDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: string // 用户id
}
