import { Controller, Post, Body, Res } from '@nestjs/common'
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
