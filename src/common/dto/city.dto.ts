import { IsString } from 'class-validator'

export class CityDto {
  @IsString()
  label: string

  @IsString()
  value: string
}