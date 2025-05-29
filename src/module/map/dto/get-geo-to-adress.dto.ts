import { IsNotEmpty } from 'class-validator';

export class GetGeoToAdressDto {
  @IsNotEmpty()
  lon: string

  @IsNotEmpty()
  lat: string
}
