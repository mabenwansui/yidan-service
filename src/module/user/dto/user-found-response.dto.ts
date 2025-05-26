import { OmitType } from '@nestjs/mapped-types'
import { Expose, Transform, Type } from 'class-transformer'
import { ROLE } from '@/common/constants/role'
import { toId } from '@/common/utils/transform'
import { PageBaseResponseDto } from '@/common/dto/page-base.dto'
import { User } from '../schemas/user.schema'

export class UserFoundOneResponseDto extends OmitType(User, ['password', 'openidMpWx'])  {
  @Expose()
  @Transform(toId)
  id?: string  

  @Expose()
  username: string

  @Expose()
  nickname?: string

  @Expose()
  avatarUrl?: string

  @Expose()
  role: ROLE[]  

  @Expose()
  email?: string

  @Expose()
  phoneNumber?: string
}

export class UserSearchResponseDto extends PageBaseResponseDto {
  @Expose()
  @Type(() => UserFoundOneResponseDto)
  list: UserFoundOneResponseDto[]
}