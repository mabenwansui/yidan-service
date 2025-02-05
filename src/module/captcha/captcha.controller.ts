import { Controller, Post } from '@nestjs/common'
import { CaptchaService } from './captcha.service'
import { VerifyCaptchaDto } from './dto/verifyCaptcha.dto'
import { Public } from '@/common/decorators/public.decorator'

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly CaptchaService: CaptchaService) {}
  @Post()
  @Public()
  async getCaptcha() {
    return await this.CaptchaService.createCaptcha()
  }
  @Post('verify')
  @Public()
  async verifyCaptcha(verifyCaptchaDto: VerifyCaptchaDto) {
    const { key, val } = verifyCaptchaDto
    return await this.CaptchaService.verifyCaptcha(key, val)
  }
}
