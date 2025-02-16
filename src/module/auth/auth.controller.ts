import { Controller, Post, Body, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { RefreshAuthDto } from './dto/refresh-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
}
