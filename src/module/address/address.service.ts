import { Controller, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'
import { WithMongoId } from '@/common/types/mongo.interface'
import { Address } from './schemas/address.schema'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { AddressFoundOneResponseDto, AddressSearchResponseDto } from './dto/address-found-response.dto'

@Controller('address')
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<Address>
  ) {}

  private formatLocation<T extends CreateAddressDto | UpdateAddressDto>(dto: T) {
    const { lon, lat, ...rest } = dto
    const location = {
      type: 'Point',
      coordinates: [lon, lat]
    }
    return { location, ...rest }
  }

  private formatResponse(item: WithMongoId<Address>) {
    const { location, _id, ...rest } = item
    const [lon, lat] = location.coordinates
    return { lon, lat, ...rest }
  }

  async create(
    createAddressDto: CreateAddressDto,
    userId: string
  ) {
    try {
      return await this.addressModel.create({
        ...this.formatLocation<CreateAddressDto>(createAddressDto),
        userId: userId
      })
    } catch (e) {
      logger.error(e)
      throw new HttpException(
        ERROR_MESSAGE.CREATE_ADDRESS_ERROR,
        ERROR_MESSAGE.CREATE_ADDRESS_ERROR.status
      )
    }
  }

  async update(updateAddressDto: UpdateAddressDto, userId: string) {
    const {
      id,
      isDefault = false,
      ...rest
    } = this.formatLocation<UpdateAddressDto>(updateAddressDto)
    // 当修改默认时, 将其它地址的 isDefault 设为 false, 保证只有一个默认地址
    if (isDefault === true) {
      await this.addressModel.updateMany({ userId }, { isDefault: false })
    }
    const doc = await this.addressModel.findOneAndUpdate(
      {
        _id: id,
        userId
      },
      { ...rest, isDefault }
    )
    if (!doc)
      throw new HttpException(
        ERROR_MESSAGE.UPDATE_ADDRESS_ERROR,
        ERROR_MESSAGE.UPDATE_ADDRESS_ERROR.status
      )
    return {}
  }

  async delete(id: string, userId: string) {
    const doc = await this.addressModel.findOneAndDelete({ _id: id, userId })
    if (!doc)
      throw new HttpException(
        ERROR_MESSAGE.DELETE_ADDRESS_ERROR,
        ERROR_MESSAGE.DELETE_ADDRESS_ERROR.status
      )
    return {}
  }

  async getInfo(id: string, userId: string): Promise<AddressFoundOneResponseDto> {
    const doc = await this.addressModel.findOne({ _id: id, userId }).lean()
    return this.formatResponse(doc)
  }

  async search(query: any): Promise<AddressSearchResponseDto> {
    const doc = await this.addressModel.find(query).sort({ createdAt: -1 }).lean()
    return {
      list: doc.map(item => this.formatResponse(item))
    }
  }
}
