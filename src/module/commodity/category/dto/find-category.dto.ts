import { IsOptional } from 'class-validator'

export class SearchCategoryDto {
  @IsOptional()
  hasRootCategory?: boolean
}
