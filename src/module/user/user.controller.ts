import { Body, Controller, Post } from '@nestjs/common'
import { Public } from '@/common/decorators/public.decorator'
import { CreateUserDto, CreateAdminDto } from './dto/create.dto'
import { GetUserInfoDto, GetUserInfoByIdDto } from './dto/get-user-info.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async create(@Body() createDto: CreateUserDto) {
    return await this.userService.createUser(createDto)
  }

  @Public()
  @Post('register-admin')
  async createAdmin(@Body() createDto: CreateAdminDto) {
    return await this.userService.createAdmin(createDto)
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
