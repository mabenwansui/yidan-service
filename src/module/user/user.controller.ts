import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserInfoDto, GetUserInfoByIdDto } from './dto/get-user-info.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)    
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
