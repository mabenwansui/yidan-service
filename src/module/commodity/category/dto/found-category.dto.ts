import { IsOptional } from 'class-validator'

export class FoundCategoryDto {
  @IsOptional()
  hasRootCategory?: boolean
}
