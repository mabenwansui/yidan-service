import { Controller } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Address } from './schemas/address.schema'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

@Controller('address')
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<Address>
  ) {}

  async create(createAddressDto: CreateAddressDto, userId: string) {
    const { _id } = await this.addressModel.create({
      ...createAddressDto,
      userId: userId
    })
    return {
      id: _id.toString()
    }
  }

  async update(updateAddressDto: UpdateAddressDto, userId: string) {
    const { id, isDefault = false, ...rest } = updateAddressDto
    if (isDefault === true) {
      await this.addressModel.updateMany({ userId }, { isDefault: false })
    }
    await this.addressModel.findByIdAndUpdate(id, { ...rest, isDefault })
    return { status: 'ok' }
  }

  async delete(id: string) {
    await this.addressModel.findByIdAndDelete(id)
    return { status: 'ok' }
  }

  async search(query: any) {
    return await this.addressModel.find(query).sort({ createdAt: -1 }).select('receiver city address phoneNumber title isDefault')
  }
}
