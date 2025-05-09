import { UserInterface } from '../interface/user.interface'
import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteUserDto implements Partial<UserInterface> {
  @IsString()
  @IsNotEmpty()
  id: string
}
