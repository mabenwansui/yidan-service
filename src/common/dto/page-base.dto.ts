import { Expose } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class PageBaseDto {
  @IsNumber()
  @IsOptional()
  curPage?: number

  @IsNumber()
  @IsOptional()
  total?: number

  @IsNumber()
  @IsOptional()
  pageSize?: number

  constructor() {
    this.curPage = 1
    this.pageSize = 20
  }
}

export class PageBaseResponseDto {
  @Expose()
  curPage?: number

  @Expose()
  pageSize?: number

  @Expose()
  total: number
}