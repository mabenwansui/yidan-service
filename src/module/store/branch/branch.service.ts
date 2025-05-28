import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { PAGE_SIZE } from '@/common/constants/page'
import { Branch } from './schemas/branch.schema'
import { CreateBranchDto } from './dto/create-branch.dto'
import { SearchBranchDto } from './dto/find-branch.dto'
import { UpdateBranchDto } from './dto/update-branch.dto'
import { BranchSearchedByStoreResponseDto } from './dto/branch-found-response.dto'

import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name)
    private readonly branchModel: Model<Branch>
  ) {}
  async create(params: CreateBranchDto) {
    const { commodityId, storeId, ...rest } = params
    return await this.branchModel.create({
      commodity: commodityId,
      store: storeId,
      ...rest
    })
  }
  async update(params: UpdateBranchDto) {
    const { id, commodityId, storeId, ...rest } = params    
    await this.branchModel.findByIdAndUpdate(id, {
      commodity: commodityId,
      store: storeId,
      ...rest
    })
    return {}
  }
  async delete(id: string) {
    return await this.branchModel.findByIdAndDelete(id)
  }

  async searchCommodity(params: SearchBranchDto): Promise<BranchSearchedByStoreResponseDto> {
    const db = this.branchModel
    const {
      curPage = 1,
      pageSize = PAGE_SIZE,
      storeId,
      commodityId,
      categoryId,
      isOnShelf
    } = params

    const pipeline: any = [
      {
        $match: {
          ...(storeId && { store: new Types.ObjectId(storeId) }),
          ...(commodityId && { commodity: new Types.ObjectId(commodityId) }),
          ...((isOnShelf !== undefined) && { isOnShelf })
        }
      },
      {
        $lookup: {
          from: 'commodities',
          localField: 'commodity',
          foreignField: '_id',
          as: 'commodity'
        }
      },
      { $unwind: '$commodity' },
      {
        $lookup: {
          from: 'categories',
          localField: 'commodity.category',
          foreignField: '_id',
          as: 'commodity.category'
        }
      },
      { $unwind: { path: '$commodity.category', preserveNullAndEmptyArrays: true } },
      ...(categoryId
        ? [{ $match: { 'commodity.category._id': new Types.ObjectId(categoryId) } }]
        : []),
      { $sort: { createdAt: -1 } },     
      { $skip: Math.max(curPage - 1, 0) * pageSize },
      { $limit: pageSize },
    ]
    const [data, total] = await Promise.all([
      db.aggregate(pipeline),
      db.countDocuments(pipeline[0].$match)
    ])
    return {
      total,
      curPage,
      pageSize,
      list: data as any
    }
  }
}
