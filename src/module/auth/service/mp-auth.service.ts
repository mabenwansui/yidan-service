import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { HttpService } from '@nestjs/axios'
import { Model } from 'mongoose'
import { firstValueFrom } from 'rxjs'
import { generateUuid } from '@/common/utils/generateUuid'
import { ROLE } from '@/common/constants/role'
import { UserService } from '@/module/user/user.service'
import { Auth } from '../schemas/auth.schemas'
import { BaseService } from './base.service'

@Injectable()
export class MpAuthService extends BaseService {
  constructor(
    @InjectModel(Auth.name)
    public readonly authModel: Model<Auth>,
    private userService: UserService,
    public jwtService: JwtService,
    private readonly httpService: HttpService
  ) {
    super(authModel, jwtService)
  }

  public async loginMpWx(code: string) {
    const openid = await this.getWeiXinOpenId(code)
    const userDoc = await this.userService._findOne({ openidMpWx: openid })
    let userId: string
    let username: string
    let role: ROLE[]
    if (!userDoc) {
      role = [ROLE.USER_MP_WX]
      username = `wx_${generateUuid()}`
      const { id } = await this.userService.createUser({
        username,
        openidMpWx: openid,
        role
      })
      userId = id
    } else {
      userId = userDoc.id
      role = userDoc.role
      username = userDoc.username
    }
    const jwt = await this.createToken({ id: userId, role, username })
    // const authKey = await this.createAuthKey({
    //   userId,
    //   userName: username,
    //   expiresIn: new Date(Date.now() + AUTH_EXPIRE_TIME)
    // })
    return { token: jwt }
  }

  /** 使用wx.login()获取code, 通过appid + appsecret + code换取openid */
  private async getWeiXinOpenId(code: string) {
    const { data } = await firstValueFrom(
      this.httpService.get<{
        session_key: string // 会话密钥
        openid: string // 用户唯一标识
        unionid: string // 用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回，详见 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html
        errcode: number // 错误码
      }>('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
          appid: process.env.WEIXIN_APPID,
          secret: process.env.WEIXIN_APPSECRET,
          js_code: code,
          grant_type: 'authorization_code'
        }
      })
    )
    const { openid, errcode } = data
    return openid
  }

  // public async refreshAuth(authKey: string, response: Response) {
  //   const token = await this.getRefreshToken(authKey)
  //   const now = Date.now()
  //   return {
  //     status: 'ok'
  //   } as const
  // }
}
