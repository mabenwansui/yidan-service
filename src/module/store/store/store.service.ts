import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Store } from './schemas/store.schema'
import { StoreCreatedResponseDto } from './dto/store-created-response.dto'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { SearchStoreDto } from './dto/search-store.dto'
import { selectForm as selectUserForm } from '@/common/constants/user'
import { PAGE_SIZE } from '@/common/constants/page'

import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly StoreModel: Model<Store>
  ) {}
  async create(params: CreateStoreDto): Promise<StoreCreatedResponseDto> {
    const { id } = await this.StoreModel.create(params)
    return { id }
  }

  async update(params: UpdateStoreDto) {
    const { id, ...rest } = params
    await this.StoreModel.findByIdAndUpdate(id, rest)
    return {
      status: 'ok'
    }
  }

  async delete(id: string) {
    await this.StoreModel.findByIdAndDelete(id)
    return {
      status: 'ok'
    }
  }

  async search(params: SearchStoreDto) {
    const db = this.StoreModel
    const { name, owner, city, curPage, pageSize = PAGE_SIZE } = params
    const query: any = {}
    if (name) {
      query.name = { $regex: name, $options: 'i' }
    }
    if (city) {
      query.city = { $regex: city, $options: 'i' }
    }
    const total = await db.countDocuments(query)
    const data = await db
      .find(query)
      .select('id name owner imgNames coverImageUrl description city address open location')
      .populate('owner', selectUserForm)
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: data as any
    }
  }
}
