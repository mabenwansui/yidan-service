import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { generateUuid } from '@/common/utils/generateuuid'
import { pwdEncrypt } from '@/common/utils/pwdEncrypt'
import { ROLE } from '@/common/constants/role'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { CaptchaService } from '@/module/captcha/captcha.service'
import { User } from './schemas/user.schema'
import { CreateUserDto, CreateAdminDto } from './dto/create.dto'
import { UserCreatedResponseDto } from './dto/user-created-response.dto'
import { UserFoundOneResponseDto } from './dto/user-found-response.dto'
import { UserUpdateDto } from './dto/user-update.dto'
import logger from '@/common/utils/logger'

const selectUserInfo = 'id username nickname email phoneNumber role'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly captchaService: CaptchaService
  ) {}

  async createUser(params: CreateUserDto): Promise<UserCreatedResponseDto> {
    const { id } = await this.userModel.create({
      id: generateUuid(),
      ...params
    })
    return { id }
  }

  async createAdmin(params: CreateAdminDto): Promise<UserCreatedResponseDto> {
    const { captchaKey, captchaVal, ...rest } = params
    const captcha = this.captchaService.verifyCaptcha(captchaKey, captchaVal)
    if (!captcha) {
      throw new HttpException(ERROR_MESSAGE.CAPTCHA_ERROR, ERROR_MESSAGE.CAPTCHA_ERROR.status)
    }
    const { username, password } = rest
    const isUnique = await this.userModel.findOne({ username })
    if (isUnique) {
      throw new HttpException(
        ERROR_MESSAGE.USER_ALREADY_USED,
        ERROR_MESSAGE.USER_ALREADY_USED.status
      )
    }
    try {
      const _password = await pwdEncrypt(password)
      const dto = {
        ...rest,
        id: generateUuid(),
        username,
        password: _password,
        role: [ROLE.STAFF]
      }
      const { id } = await this.userModel.create(dto)
      return { id }
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGE.CREATE_USER_ERROR,
        ERROR_MESSAGE.CREATE_USER_ERROR.status
      )
    }
  }

  async getUserInfo(userId: string): Promise<UserFoundOneResponseDto> {
    const doc = await this.userModel.findOne({ id: userId }).select(selectUserInfo)
    if (!doc) {
      throw new HttpException(ERROR_MESSAGE.USER_NOT_FOUND, ERROR_MESSAGE.USER_NOT_FOUND.status)
    }
    return doc
  }

  async search(params: {
    id?: string
    username?: string
    nickname?: string
    role?: ROLE[]
    curPage?: number
    pageSize?: number
  }) {
    const db = this.userModel
    const { id, username, nickname, role, curPage, pageSize } = params
    const query: any = {}
    if (id) {
      query.id = id
    }
    if (username) {
      query.name = { $regex: username, $options: 'i' }
    }
    if (nickname) {
      query.nickname = { $regex: nickname, $options: 'i' }
    }
    if (role) {
      query.role = { $in: role }
    }
    const total = await db.countDocuments(query)
    const data = await db
      .find(query)
      .select('id username nickname email role phoneNumber')
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: data as any
    }
  }

  async update(id: string, params: UserUpdateDto) {
    try {
      await this.userModel.updateOne({ id }, params)
      return {
        status: 'ok'
      }
    } catch (error) {
      logger.error(error)
      throw new HttpException(
        ERROR_MESSAGE.UPDATE_USER_ERROR,
        ERROR_MESSAGE.UPDATE_USER_ERROR.status
      )
    }
  }

  async delete(id: string) {
    const doc = await this.userModel.findOne({ id })
    if (doc.role.includes(ROLE.ADMIN)) {
      throw new HttpException(
        ERROR_MESSAGE.DELETE_SUPER_ADMIN_ERROR,
        ERROR_MESSAGE.DELETE_SUPER_ADMIN_ERROR.status
      )
    }
    try {
      await this.userModel.deleteOne({ id })
      return {
        status: 'ok'
      }
    } catch (error) {
      logger.error(error)
      throw new HttpException(
        ERROR_MESSAGE.DELETE_USER_ERROR,
        ERROR_MESSAGE.DELETE_USER_ERROR.status
      )
    }
  }

  async _findOne(query: Object) {
    return await this.userModel.findOne(query)
  }
}
