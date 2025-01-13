import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { CreateAdminDto } from './dto/create-admin.dto'
import { GetUserInfoDto, GetUserInfoByIdDto } from './dto/get-user-info.dto'
import { UserService } from './user.service'
import { ROLE } from './constants'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create({
      ...createUserDto,
      role: ROLE.USER,
    })
  }

  @Post('register-admin')
  async createAdmin(@Body() createUserDto: CreateAdminDto) {
    return await this.userService.createAdmin({
      ...createUserDto,
      role: ROLE.ADMIN,
    })
  }

  @Post('get-user-info')
  async getUserInfo(@Body() getUserInfoDto: GetUserInfoDto) {
    return await this.userService.findByUsername(getUserInfoDto.username)
  }

  @Post('get-user-info-by-id')
  async getUserInfoById(@Body() getUserInfoByIdDto: GetUserInfoByIdDto) {
    return await this.userService.findById(getUserInfoByIdDto.id)
  }
}
