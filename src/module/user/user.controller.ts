import { Post, Controller, Body, Req } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { UserService } from './user.service'
import { CreateAdminDto } from './dto/create.dto'
import { SearchAdminDto, SearchStaffDto } from './dto/search-admin.dto'
import { UserUpdateRoleDto } from './dto/user-update.dto'
import { UserDeleteDto } from './dto/user-delete.dto'
import { UserUpdateDto } from './dto/user-update.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register-admin')
  async createAdmin(@Body() createDto: CreateAdminDto) {
    return await this.userService.createAdmin(createDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('get-userinfo')
  async getUserInfo(@Req() request) {
    return await this.userService.getUserInfo(request.user.sub)
  }

  @Auth()
  @Post('search-admin')
  async searchAdmin(@Body() searchAdminDto: SearchAdminDto) {
    const { role, ...rest } = searchAdminDto
    const _role = role ? role.filter((item) => item !== ROLE.SUPER_ADMIN) : [ROLE.ADMIN, ROLE.STAFF]
    return await this.userService.search({
      role: _role,
      ...rest
    })
  }

  @Auth(ROLE.ADMIN)
  @Post('search-staff')
  async searchStaff(@Body() searchAdminDto: SearchStaffDto) {
    return await this.userService.search({
      role: [ROLE.STAFF],
      ...searchAdminDto
    })
  }  

  @Auth(ROLE.ADMIN, ROLE.STAFF, ROLE.USER)
  @Post('update')
  async update(@Body() userUpdateRoleDto: UserUpdateDto, @Req() request) {
    return await this.userService.update(request.user.sub, userUpdateRoleDto)
  }

  @Auth()
  @Post('change-role')
  async changeRole(@Body() userUpdateRoleDto: UserUpdateRoleDto, @Req() request) {
    return await this.userService.update(request.user.sub, userUpdateRoleDto)
  }

  @Auth()
  @Post('delete')
  async delete(@Body() userDeleteDto: UserDeleteDto) {
    const { id } = userDeleteDto
    await this.userService.delete(id)
  }
}
