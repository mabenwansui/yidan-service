import { OmitType } from '@nestjs/mapped-types'
import { Expose, Type, Transform } from 'class-transformer'
import { toId } from '@/common/utils/transform'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { Tag, TagType } from '../schemas/tag.schema'

export class TagFoundOneResponseDto extends OmitType(Tag, []) {
  @Expose()
  @Transform(toId)
  id?: string

  @Expose()
  type: TagType

  @Expose()
  name: string

  @Expose()
  sort: number

  @Expose()
  isSystem: boolean

  @Expose()
  @Type(() => UserFoundOneResponseDto)
  creator: UserFoundOneResponseDto
}

export class SearchTagResponseDto {
  @Expose()
  @Type(() => TagFoundOneResponseDto)
  list: TagFoundOneResponseDto[]
}