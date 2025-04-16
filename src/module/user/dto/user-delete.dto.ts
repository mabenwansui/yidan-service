import { UserInterface } from '../interface/user.interface'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserDeleteDto implements Partial<UserInterface> {
  @IsString()
  @IsNotEmpty()
  id: string
}
