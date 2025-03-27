import { HttpException, Injectable } from '@nestjs/common'
import { Response, CookieOptions } from 'express'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Auth } from '../schemas/auth.schemas'
import { UserService } from '@/module/user/user.service'
import { UserFoundOneResponseDto } from '@/module/user/dto/user-found-response.dto'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { ROLE } from '@/common/constants/role'
import { BaseService } from './base.service'

const COOKIE_EXPIRE_TIME = 1e3 * 60 * 60 * 24 * 7 // 7 days
const AUTH_EXPIRE_TIME = 1e3 * 60 * 60 * 24 * 1 // 1 days

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @InjectModel(Auth.name)
    public readonly authModel: Model<Auth>,
    private userService: UserService,
    public jwtService: JwtService
  ) {
    super(authModel, jwtService)
  }
  /** 使用wx.login()获取code, 通过appid + appsecret + code换取openid */
  public async getWeiXinOpenId(code: string) {
    
  }

  public async refreshAuth(authKey: string, response: Response) {
    const token = await this.getRefreshToken(authKey)
    const now = Date.now()
    return {
      status: 'ok'
    } as const
  }


}
