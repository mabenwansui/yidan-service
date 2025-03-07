import { Controller, Post } from '@nestjs/common'
import { CaptchaService } from './captcha.service'
import { VerifyCaptchaDto } from './dto/verify-captcha.dto'

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly CaptchaService: CaptchaService) {}
  @Post()
  async getCaptcha() {
    return await this.CaptchaService.createCaptcha()
  }
  @Post('verify')
  async verifyCaptcha(verifyCaptchaDto: VerifyCaptchaDto) {
    const { key, val } = verifyCaptchaDto
    return await this.CaptchaService.verifyCaptcha(key, val)
  }
}
