import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { pwdEncrypt } from '@/common/utils/pwdEncrypt'
import { ROLE } from '@/common/constants/role'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { CaptchaService } from '@/module/captcha/captcha.service'
import { User } from './schemas/user.schema'
import { CreateUserDto, CreateAdminDto } from './dto/create-user.dto'
import { UserFoundOneResponseDto, UserSearchResponseDto } from './dto/user-found-response.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import logger from '@/common/utils/logger'
import { selectForm } from '@/common/constants/user'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly captchaService: CaptchaService
  ) {}

  async createUser(params: CreateUserDto) {
    return await this.userModel.create({
      ...params,
      role: [ROLE.USER]
    })
  }

  async createAdmin(params: CreateAdminDto) {
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
        username,
        password: _password,
        role: [ROLE.STAFF]
      }
      return await this.userModel.create(dto)
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGE.CREATE_USER_ERROR,
        ERROR_MESSAGE.CREATE_USER_ERROR.status
      )
    }
  }

  async getUserInfo(id: string): Promise<UserFoundOneResponseDto> {
    try {
      return await this.userModel.findById(id).select(selectForm)
    } catch (error) {
      logger.error(error)
      throw new HttpException(ERROR_MESSAGE.USER_NOT_FOUND, ERROR_MESSAGE.USER_NOT_FOUND.status)
    }
  }

  async search(params: {
    id?: string
    username?: string
    nickname?: string
    role?: ROLE[]
    curPage?: number
    pageSize?: number
  }): Promise<UserSearchResponseDto> {
    const db = this.userModel
    const { id, username, nickname, role, curPage, pageSize } = params
    const query: any = {}
    if (id) {
      query._id = id
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
      total: total,
      curPage,
      pageSize: pageSize,
      list: data as any
    }
  }

  async update(id: string, params: UpdateUserDto): Promise<UserFoundOneResponseDto> {
    try {
      return await this.userModel.findByIdAndUpdate(id, params)
    } catch (error) {
      logger.error(error)
      throw new HttpException(
        ERROR_MESSAGE.UPDATE_USER_ERROR,
        ERROR_MESSAGE.UPDATE_USER_ERROR.status
      )
    }
  }

  async delete(id: string): Promise<Record<never, never>> {
    const doc = await this.userModel.findById(id)
    if (doc.role.includes(ROLE.ADMIN)) {
      throw new HttpException(
        ERROR_MESSAGE.DELETE_SUPER_ADMIN_ERROR,
        ERROR_MESSAGE.DELETE_SUPER_ADMIN_ERROR.status
      )
    }
    try {
      await this.userModel.deleteOne({ id })
      return {}
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
