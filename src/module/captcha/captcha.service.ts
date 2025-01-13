import { Injectable } from '@nestjs/common'
import { generateUuid } from '@/common/utils/generateUuid'
import captchaStore from './captcha.store'
import * as captcha from 'svg-captcha'

@Injectable()
export class CaptchaService {
  async createCaptcha() {
    const key = generateUuid(20)
    const { text, data } = captcha.createMathExpr({
      size: 4,
      ignoreChars: '0o1i',
      color: true,
    })
    captchaStore.set(key, text)
    return {
      key,
      data,
    }
  }
  verifyCaptcha(key: string, captchaValue: string) {
    const captchaText = captchaStore.get(key)
    if (!captchaText || captchaText.toLowerCase() !== captchaValue.toLowerCase()) {
      return false
    }
    return true
  }
}

// throw new HttpException(
//   ERROR_MESSAGE.CAPTCHA_ERROR.message,
//   ERROR_MESSAGE.CAPTCHA_ERROR.status,
// )
