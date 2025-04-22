import { IsNotEmpty, IsString, IsNumber, Min, IsBoolean, IsOptional } from 'class-validator'

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  storeId: string

  @IsString()
  @IsNotEmpty()
  commodityId: string

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  stockConunt?: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  soldCount?: number

  @IsBoolean()
  @IsOptional()
  isOnShelf?: boolean
}
