import { Injectable, HttpException } from '@nestjs/common'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
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
      color: true
    })
    captchaStore.set(key, text)
    return {
      key,
      data
    }
  }
  verifyCaptcha(key: string, captchaValue: string) {
    const captchaText = captchaStore.get(key)
    if (!captchaText || captchaText?.toLowerCase() !== captchaValue?.toLowerCase()) {
      throw new HttpException(ERROR_MESSAGE.CAPTCHA_ERROR, ERROR_MESSAGE.CAPTCHA_ERROR.status)
    }
    return {
      status: 'ok'
    }
  }
}

// throw new HttpException(
//   ERROR_MESSAGE.CAPTCHA_ERROR,
//   ERROR_MESSAGE.CAPTCHA_ERROR.status,
// )
