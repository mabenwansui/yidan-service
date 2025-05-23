import { Expose } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class PageBaseDto {
  @IsNumber({}, { message: '页码必须是数字' })
  @IsOptional()
  curPage?: number // 页码

  @IsNumber({}, { message: '总页数必须是数字' })
  @IsOptional()
  total?: number // 总页数

  @IsNumber({}, { message: '每页展示数量必须是数字' })
  @IsOptional()
  pageSize?: number // 每页数量

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