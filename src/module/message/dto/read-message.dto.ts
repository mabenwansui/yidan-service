import { IsOptional } from 'class-validator'

export class ReadMessageDto {
  @IsOptional()
  id?: string
}