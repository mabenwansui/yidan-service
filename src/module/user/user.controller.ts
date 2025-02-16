import { Post, Controller, UseGuards, Body, Req } from '@nestjs/common'
import { CreateUserDto, CreateAdminDto } from './dto/create.dto'
import { UserService } from './user.service'
import { JwtAdminGuard } from '@/module/auth/jwt-admin.guard'
import { JwtPayload } from '@/module/auth/interface/jwt-payload.interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createDto: CreateUserDto) {
    return await this.userService.createUser(createDto)
  }

  @Post('register-admin')
  async createAdmin(@Body() createDto: CreateAdminDto) {
    return await this.userService.createAdmin(createDto)
  }

  @UseGuards(JwtAdminGuard)
  @Post('get-user-info')
  async getUserInfo(@Req() request) {
    return await this.userService.getUserInfo(request.user as JwtPayload)
  }

  // @UseGuards(JwtAdminGuard)
  // @Post('get-user-info-by-id')
  // async getUserInfoById(@Body() getUserInfoByIdDto: GetUserInfoByIdDto) {
  //   return await this.userService.findById(getUserInfoByIdDto.id)
  // }
}
