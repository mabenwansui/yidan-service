import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Auth } from '../schemas/auth.schemas'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { generateUuid } from '@/common/utils/generateUuid'
import { ROLE } from '@/common/constants/role'

interface AuthorizationParams {
  username: string
  id: string
  role: ROLE[]
}

interface CreateAuthParams {
  userId: string
  userName: string
  expiresIn: Date
}

@Injectable()
export class BaseService {
  constructor(
    @InjectModel(Auth.name)
    public readonly authModel: Model<Auth>,
    public jwtService: JwtService
  ) {}

  async refreshToken(authKey: string): Promise<string> {
    const result = await this.authModel.findOne({ key: authKey })
    if (result) {
      const { userId, userName, expiresIn } = result
      if (Date.now() <= expiresIn.getTime()) {
        const token = await this.createToken({ username: userName, id: userId, role: [ROLE.ADMIN] })
        return token
      }
    }              
    throw new HttpException(
      ERROR_MESSAGE.AUTH_REFRESH_CHECK_ERROR,
      ERROR_MESSAGE.AUTH_REFRESH_CHECK_ERROR.status
    )
  }

  public async createAuthKey(params: CreateAuthParams): Promise<string> {
    const { userId, userName, expiresIn } = params
    const result = await this.authModel.findOne({ userId })
    let key: string
    if (result) {
      await this.authModel.updateOne(
        { userId },
        {
          expiresIn
        }
      )
      key = result.key
    } else {
      const authKey = generateUuid()
      await this.authModel.create({
        userId,
        userName,
        key: authKey,
        expiresIn
      })
      key = authKey
    }
    return key
  }
  // 授权
  public async createToken(params: AuthorizationParams) {
    const { username, id, role } = params
    const payload = { name: username, sub: id, role }
    const jwt = await this.jwtService.signAsync(payload)
    return jwt
  }
}
