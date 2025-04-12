import { IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';
import { Commodity } from '../interface/order.interface';

export class CommodityDto implements Commodity {
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  coverImageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}