import { PickType } from '@nestjs/mapped-types'
import { Tag, TagType } from '../schemas/tag.schema'
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator'

export class CreateTagDto extends PickType(Tag, ['type', 'name', 'sort','isSystem']) {
  @IsEnum(TagType)
  @IsNotEmpty()
  type: TagType

  @IsNotEmpty()
  name: string

  @IsOptional()
  sort?: number

  @IsNotEmpty()
  isSystem: boolean
}