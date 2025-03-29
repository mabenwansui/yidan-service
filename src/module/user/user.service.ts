// import { GetUserInfoDto } from './dto/get-user-info.dto'
import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { generateUuid } from '@/common/utils/generateuuid'
import { pwdEncrypt } from '@/common/utils/pwdEncrypt'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { User } from './schemas/user.schema'
import { ROLE } from '@/common/constants/role'
import { CreateDto, CreateUserDto, CreateAdminDto } from './dto/create.dto'
import { UserCreatedResponseDto } from './dto/user-created-response.dto'
import { UserFoundOneResponseDto } from './dto/user-found-response.dto'
import { CaptchaService } from '@/module/captcha/captcha.service'
import { JwtPayload } from '@/module/auth/interface/jwt-payload.interface'

const selectUserInfo = 'id username email role'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly captchaService: CaptchaService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserCreatedResponseDto> {
    const { id } = await this.userModel.create({
      id: generateUuid(),
      ...createUserDto
    })
    return { id }
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<UserCreatedResponseDto> {
    const { captchaKey, captchaVal, ...rest } = createAdminDto
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
        role: [ROLE.ADMIN]
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

  async getUserInfo(jwtPayload: JwtPayload): Promise<UserFoundOneResponseDto> {
    const { sub: userId } = jwtPayload
    const doc = await this.userModel.findOne({ id: userId }).select(selectUserInfo)
    if (!doc) {
      throw new HttpException(ERROR_MESSAGE.USER_NOT_FOUND, ERROR_MESSAGE.USER_NOT_FOUND.status)
    }
    return doc
  }

  async _findOne(query: Object) {
    return await this.userModel.findOne(query)
  }
}

// private async create(createDto: CreateDto & Role): Promise<UserCreatedResponseDto> {
//   const { username, password, ...rest } = createDto
//   const isUnique = await this.userModel.findOne({ username })
//   if (isUnique) {
//     throw new HttpException(
//       ERROR_MESSAGE.USER_ALREADY_USED,
//       ERROR_MESSAGE.USER_ALREADY_USED.status
//     )
//   }
//   try {
//     const _password = await pwdEncrypt(password)
//     const date = new Date()
//     const dto = {
//       id: generateUuid(16),
//       createdAt: date,
//       updatedAt: date,
//       username,
//       password: _password,
//       ...rest
//     }
//     const result = await this.userModel.create(dto)
//     return {
//       id: result.id,
//       username: result.username,
//       email: result.email,
//       phoneNumber: result.phoneNumber,
//       role: result.role
//     }
//   } catch (error) {
//     console.error(error)
//     throw new HttpException(
//       ERROR_MESSAGE.CREATE_USER_ERROR,
//       ERROR_MESSAGE.CREATE_USER_ERROR.status
//     )
//   }
// }
