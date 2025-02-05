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

interface Role {
  role: ROLE
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly captchaService: CaptchaService,
  ) {}

  private async create(createDto: CreateDto & Role): Promise<UserCreatedResponseDto> {
    const { username, password, ...rest } = createDto
    const isUnique = await this.userModel.findOne({ username })
    if (isUnique) {
      throw new HttpException(
        ERROR_MESSAGE.USER_ALREADY_USED,
        ERROR_MESSAGE.USER_ALREADY_USED.status,
      )
    }
    try {
      const _password = await pwdEncrypt(password)
      const date = new Date()
      const dto = {
        id: generateUuid(16),
        createdAt: date,
        updatedAt: date,
        username,
        password: _password,
        ...rest,
      }
      return await this.userModel.create(dto)
    } catch (error) {
      console.error(error)
      throw new HttpException(
        ERROR_MESSAGE.CREATE_USER_FAILED,
        ERROR_MESSAGE.CREATE_USER_FAILED.status,
      )
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserCreatedResponseDto> {
    const dto = {
      ...createUserDto,
      role: ROLE.USER,
    }
    return await this.create(dto)
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<UserCreatedResponseDto> {
    const { captchaKey, captchaVal, ...rest } = createAdminDto
    const captcha = this.captchaService.verifyCaptcha(captchaKey, captchaVal)
    if (!captcha) {
      throw new HttpException(ERROR_MESSAGE.CAPTCHA_ERROR, ERROR_MESSAGE.CAPTCHA_ERROR.status)
    }
    const dto = {
      ...rest,
      role: ROLE.ADMIN,
    }
    return await this.create(dto)
  }

  async findByUsername(username: string): Promise<UserFoundOneResponseDto> {
    return await this.userModel.findOne({ username })
  }

  async findById(id: string): Promise<UserFoundOneResponseDto> {
    return await this.userModel.findById({ id })
  }
}

// async findByUsername(username: FindUserByNameDto['username']): Promise<User> {
//   return this.userModel.findOne({ username })
// }

// async update(id: string, updateUserDto: CreateUserDto): Promise<User> {

// }

// async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
//   return this.catModel
//     .findByIdAndUpdate({ _id: id }, updateCatDto, { new: true })
//     .exec();
// }

// async delete(id: string): Promise<Commodity> {
//   const deletedCat = await this.catModel
//     .findByIdAndDelete({ _id: id })
//     .exec();
//   return deletedCat;
// }
