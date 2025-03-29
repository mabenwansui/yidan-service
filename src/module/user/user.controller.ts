import { Post, Controller, UseGuards, Body, Req } from '@nestjs/common'
import { CreateAdminDto } from './dto/create.dto'
import { UserService } from './user.service'
import { JwtAdminGuard } from '@/module/auth/jwt-admin.guard'
import { JwtPayload } from '@/module/auth/interface/jwt-payload.interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register-admin')
  async createAdmin(@Body() createDto: CreateAdminDto) {
    return await this.userService.createAdmin(createDto)
  }

  @Post('get-user-info')
  @UseGuards(JwtAdminGuard)
  async getUserInfo(@Req() request) {
    return await this.userService.getUserInfo(request.user as JwtPayload)
  }
}
