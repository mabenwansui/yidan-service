import { Post, Controller, Body, Req } from '@nestjs/common'
import { CreateAdminDto } from './dto/create.dto'
import { UserService } from './user.service'
import { JwtPayload } from '@/module/auth/interface/jwt-payload.interface'
import { ROLE } from '@/common/constants/role'
import { Auth } from '@/module/auth/guard/auth.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register-admin')
  async createAdmin(@Body() createDto: CreateAdminDto) {
    return await this.userService.createAdmin(createDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('get-user-info')
  async getUserInfo(@Req() request) {
    return await this.userService.getUserInfo(request.user as JwtPayload)
  }
}
