import { Controller, Post, Body, Res, Req } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { Response } from 'express'
import { AuthService } from './service/auth.service'
import { MpAuthService } from './service/mp-auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { RefreshAuthDto } from './dto/refresh-auth.dto'
import { LoginMpWeixinDto } from './dto/login-mp-weixin.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mpAuthService: MpAuthService
  ) {}
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto, @Res({ passthrough: true }) response: Response) {
    return await this.authService.adminLogin(loginAuthDto, response)
  }

  @Auth(ROLE.ADMIN, ROLE.STAFF)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response, @Req() request) {
    return await this.authService.logout(request.user.sub, response)
  }

  @Post('refresh-auth')
  async refreshAuth(
    @Body() refreshAuthDto: RefreshAuthDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.refreshAuth(refreshAuthDto.authKey, response)
  }

  @Post('weixin/login')
  async weixinLogin(@Body() loginMpWeixinDto: LoginMpWeixinDto) {
    const { code } = loginMpWeixinDto
    return await this.mpAuthService.loginMpWx(code)
  }
}
