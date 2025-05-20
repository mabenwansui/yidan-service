import { IsNotEmpty, IsNumber } from 'class-validator'

export class GetClosestStoreDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number

  @IsNumber()
  @IsNotEmpty()
  lng: number
}
