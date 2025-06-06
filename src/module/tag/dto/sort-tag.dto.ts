import { PickType } from '@nestjs/mapped-types'
import { Tag, TagType } from '../schemas/tag.schema'
import { IsNotEmpty, IsEnum } from 'class-validator'

export class SortItem extends PickType(Tag, ['sort']) {
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  sort: number
}

export class SortTagDto {
  @IsEnum(TagType)
  @IsNotEmpty()  
  type: TagType

  @IsNotEmpty()
  isSystem: boolean

  @IsNotEmpty()
  active: SortItem

  @IsNotEmpty()
  over: SortItem
}