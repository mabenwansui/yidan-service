import { IsNumber, IsOptional } from 'class-validator'

export class SearchCommodityDto {
  @IsOptional()
  search?: string // 搜索关键字

  @IsOptional()
  category?: string // 分类

  @IsNumber({}, { message: '页码必须是数字' })
  @IsOptional()
  curPage?: number // 页码

  @IsNumber({}, { message: '每页数量必须是数字' })
  @IsOptional()
  pageSize?: number // 每页数量

  constructor() {
    this.curPage = 1
    this.pageSize = 20
  }
}

// @IsOptional()
// name?: string

// @IsOptional()
// id?: string

// @IsNumber({}, { message: '最低价格必须是数字' })
// @IsOptional()
// minPrice?: number // 最低价格

// @IsNumber({}, { message: '最高价格必须是数字' })
// @IsOptional()
// maxPrice?: number // 最高价格

// @IsOptional()
// category?: string // 分类

// @IsOptional()
// sortBy: 'price' | 'soldCount' // 排序方式, 默认soldCount

// @IsOptional()
// sortOrder?: 'asc' | 'desc' // 排序方式，升序还是降序，默认降序

// this.sortBy = 'soldCount'
// this.sortOrder = 'desc'
