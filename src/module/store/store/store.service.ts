import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PAGE_SIZE } from '@/common/constants/page'
import { WithMongoId } from '@/common/types/mongo.interface'
import { Model } from 'mongoose'
import { Store, StorePopulate } from './schemas/store.schema'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { SearchStoreDto, FindNearStoreDto } from './dto/find-store.dto'

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

  async create(params: CreateStoreDto) {
    const { lon, lat, ...rest } = params
    const location = {
      type: 'Point',
      coordinates: [lon, lat]
    }
    return await this.StoreModel.create({
      location,
      ...rest
    })
  }

  async update(params: UpdateStoreDto) {
    const { id, ...rest } = params
    await this.StoreModel.findByIdAndUpdate(id, rest)
    return {}
  }

  async delete(id: string) {
    await this.StoreModel.findByIdAndDelete(id)
    return {
      status: 'ok'
    }
  }

  async getNearOne(findNearStoreDto: FindNearStoreDto) {
    const { lon, lat } = findNearStoreDto
    return await this.StoreModel.findOne({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lon, lat]
          }
        }
      }
    }).populate('owner')
  }

  async search(params: SearchStoreDto) {
    const db = this.StoreModel
    const { name, owner, curPage = 1, pageSize = PAGE_SIZE } = params
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
      .sort({ createdAt: 1 })
      .lean()
    return {
      total,
      curPage: 
      pageSize,
      list: data.map((item) => this.formatResponse(item))
    }
  }

  async findOne(query) {
    return await this.StoreModel.findOne(query).populate<Pick<StorePopulate, 'owner'>>('owner')
  }
}
