import {
  Post,
  Controller,
  Body,
  Req,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { UserService } from './user.service'
import { CreateAdminDto } from './dto/create-user.dto'
import { SearchAdminDto, SearchStaffDto } from './dto/find-admin.dto'
import { UserUpdateRoleDto } from './dto/update-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserCreatedResponseDto } from './dto/user-created-response.dto'
import { UserFoundOneResponseDto, UserSearchResponseDto } from './dto/user-found-response.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: UserCreatedResponseDto })
  @Post('register-admin')
  async createAdmin(@Body() createDto: CreateAdminDto) {
    return await this.userService.createAdmin(createDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: UserFoundOneResponseDto })
  @Auth(ROLE.ADMIN)
  @Post('get-userinfo')
  async getUserInfo(@Req() request) {
    return await this.userService.getUserInfo(request.user.sub)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: UserSearchResponseDto })
  @Auth()
  @Post('superadmin/search')
  async searchAdmin(@Body() searchAdminDto: SearchAdminDto) {
    const { role, ...rest } = searchAdminDto
    const _role = role ? role.filter((item) => item !== ROLE.SUPER_ADMIN) : [ROLE.ADMIN, ROLE.STAFF]
    return await this.userService.search({
      role: _role,
      ...rest
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: UserSearchResponseDto })
  @Auth(ROLE.ADMIN)
  @Post('search')
  async searchStaff(@Body() searchAdminDto: SearchStaffDto) {
    return await this.userService.search({
      role: [ROLE.STAFF],
      ...searchAdminDto
    })
  }
 
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: UserFoundOneResponseDto })
  @Auth(ROLE.ADMIN, ROLE.STAFF, ROLE.USER)
  @Post('update')
  async update(@Body() userUpdateRoleDto: UpdateUserDto, @Req() request) {
    return await this.userService.update(request.user.sub, userUpdateRoleDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: UserFoundOneResponseDto })
  @Auth()
  @Post('change-role')
  async changeRole(@Body() userUpdateRoleDto: UserUpdateRoleDto, @Req() request) {
    return await this.userService.update(request.user.sub, userUpdateRoleDto)
  }

  @Auth()
  @Post('delete')
  async delete(@Body() userDeleteDto: DeleteUserDto): Promise<Record<never, never>> {
    const { id } = userDeleteDto
    return await this.userService.delete(id)
  }
}
