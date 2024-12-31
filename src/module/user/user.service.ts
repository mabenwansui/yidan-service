import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { generateUserId } from '@/common/utils/generateuuid'
import { pwdEncrypt } from '@/common/utils/pwdEncrypt'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { User } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserInfoDto } from './dto/get-user-info.dto'
import { UserCreatedResponseDto } from './dto/user-created-response.dto'
import { UserFoundOneResponseDto } from './dto/user-found-response.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserCreatedResponseDto> {
    const { username, password, ...rest } = createUserDto
    const isUnique = await this.userModel.findOne({ username })
    if (isUnique) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: '用户名已存在',
        },
        HttpStatus.CONFLICT,
      )
    }

    try {
      const _password = await pwdEncrypt(password)
      const date = new Date()
      const dto = {
        username,
        password: _password,
        ...rest,
        id: generateUserId(),
        createdAt: date,
        updatedAt: date,
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

  async findByUsername(username: string): Promise<UserFoundOneResponseDto> {
    return await this.userModel.findOne({ username })
  }

  async findById(id: string): Promise<UserFoundOneResponseDto> {
    return await this.userModel.findById({ id })
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
}
