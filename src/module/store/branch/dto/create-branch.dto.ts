import { OmitType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsNumber, Min, IsBoolean, IsOptional } from 'class-validator'
import { Branch } from '../schemas/branch.schema'

export class CreateBranchDto extends OmitType(Branch, ['store', 'commodity']) {
  @IsNotEmpty()
  storeId: string

  @IsNotEmpty()
  commodityId: string

  @Min(0)
  @IsNumber()
  @IsOptional()
  originalPrice?: number

  @Min(0)
  @IsNumber()
  @IsOptional()
  price?: number

  @Min(0)
  @IsNumber()
  @IsOptional()
  stockConunt?: number

  @Min(0)
  @IsNumber()
  @IsOptional()
  soldCount?: number

  @IsBoolean()
  @IsOptional()
  isOnShelf?: boolean

  constructor() {
    super()
    this.isOnShelf = false
  }
}
