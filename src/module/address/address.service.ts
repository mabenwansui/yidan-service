import { Controller, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'
import { Address } from './schemas/address.schema'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { SearchAddressResponseDto } from './dto/search-address-response.dto'
import { FoundAddressResponseDto } from './dto/found-address-response.dto'

@Controller('address')
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<Address>
  ) {}

  async create(createAddressDto: CreateAddressDto, userId: string) {
    try {
      const { _id } = await this.addressModel.create({
        ...createAddressDto,
        userId: userId
      })
      return { id: _id.toString() }
    } catch (e) {
      logger.error(e)
      throw new HttpException(
        ERROR_MESSAGE.CREATE_ADDRESS_ERROR,
        ERROR_MESSAGE.CREATE_ADDRESS_ERROR.status
      )
    }
  }

  async update(updateAddressDto: UpdateAddressDto, userId: string) {
    const { id, isDefault = false, ...rest } = updateAddressDto
    if (isDefault === true) {
      await this.addressModel.updateMany({ userId }, { isDefault: false })
    }
    const doc = await this.addressModel.findByIdAndUpdate(id, { ...rest, isDefault })
    if (!doc)
      throw new HttpException(
        ERROR_MESSAGE.UPDATE_ADDRESS_ERROR,
        ERROR_MESSAGE.UPDATE_ADDRESS_ERROR.status
      )
    return { status: 'ok' }
  }

  async delete(id: string, userId: string) {
    const doc = await this.addressModel.findOneAndDelete({ _id: id, userId })
    if (!doc)
      throw new HttpException(
        ERROR_MESSAGE.DELETE_ADDRESS_ERROR,
        ERROR_MESSAGE.DELETE_ADDRESS_ERROR.status
      )
    return { status: 'ok' }
  }

  async getInfo(id: string, userId: string): Promise<FoundAddressResponseDto> {
    const doc = await this.addressModel.findById(id)
    if (doc.userId !== userId) {
      throw new HttpException(
        ERROR_MESSAGE.GET_ADDRESS_ERROR,
        ERROR_MESSAGE.GET_ADDRESS_ERROR.status
      )
    }
    return doc
  }

  async search(query: any): Promise<SearchAddressResponseDto> {
    const doc = await this.addressModel
      .find(query)
      .sort({ createdAt: -1 })
    return { list: doc }
  }
}
