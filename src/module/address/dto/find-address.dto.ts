import { IsNotEmpty } from 'class-validator'

export class GetAddressDto {
  @IsNotEmpty()
  id: string
}
