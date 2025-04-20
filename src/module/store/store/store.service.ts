import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Store } from './schemas/store.schema'
import { StoreCreatedResponseDto } from './dto/store-store-response.dto'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { SearchStoreDto } from './dto/search-store.dto'

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
  }

  async delete(id: string) {
    return await this.StoreModel.findByIdAndDelete(id)
  }

  async search(params: SearchStoreDto) {
    const db = this.StoreModel
    const { name, owner, city, curPage, pageSize } = params
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
      .select('id name owner imgNames coverImageUrl description city address location')
      .populate('owner', 'id, username, nickname')
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
      .lean()
    // const _data = data.map((item) => {
    //   const { _id, category, ...rest } = item
    //   item.coverImageUrl = item.coverImageUrl || item.imgNames[0]
    //   return {
    //     id: _id,
    //     commodityId: _id,
    //     // 通过populate返回的category是一个对象, 里面包含_id和title
    //     category: (category as unknown as WithMongoId<{ title: string }>).title,
    //     categoryId: (category as unknown as WithMongoId<{ title: string }>)._id,
    //     ...rest
    //   }
    // })
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: data as any
    }
  }
}
