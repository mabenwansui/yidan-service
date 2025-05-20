import { IsNotEmpty } from 'class-validator'

export class DeleteAddressDto {
  @IsNotEmpty()
  id: string
}
