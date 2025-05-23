import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PAGE_SIZE } from '@/common/constants/page'
import { WithMongoId } from '@/common/types/mongo.interface'
import { Model } from 'mongoose'
import { Store } from './schemas/store.schema'
import { StoreCreatedResponseDto } from './dto/store-created-response.dto'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { SearchStoreDto } from './dto/search-store.dto'
import { GetNearStoreDto } from './dto/get-near-store.dto'

import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly StoreModel: Model<Store>
  ) {}
  private formatResponse(item: WithMongoId<Store>) {
    const { location, ...rest } = item
    const [lon, lat] = location.coordinates
    return { lon, lat, ...rest }
  }

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

  async getNearOne(getNearStoreDto: GetNearStoreDto) {
    // const { latitude, longitude } = getClosestStoreDto
    // 利用 MongoDB 的地理空间查询来找到最近的店铺
    // const result = await this.StoreModel.findOne({
    //   location: {
    //     $near: {
    //       $geometry: {
    //         type: "Point",
    //         coordinates: [longitude, latitude]
    //       }
    //     }
    //   }
    // });

    // return result;
  }

  async search(params: SearchStoreDto) {
    const db = this.StoreModel
    const { name, owner, curPage, pageSize = PAGE_SIZE } = params
    const query: any = {}
    if (name) {
      query.name = { $regex: name, $options: 'i' }
    }
    const total = await db.countDocuments(query)
    const data = await db
      .find(query)
      .populate('owner')
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean()
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: data.map((item) => this.formatResponse(item))
    }
  }
}
