import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { PAGE_SIZE } from '@/common/constants/page'
import { Branch } from './schemas/branch.schema'
import { CreateBranchDto } from './dto/create-branch.dto'
import { BranchCreatedResponseDto } from './dto/branch-created-response.dto'
import { SearchBranchDto } from './dto/search-branch.dto'
import { UpdateBranchDto } from './dto/update-branch.dto'
import { BranchSearchedResponseDto } from './dto/branch-searched-response.dto'

import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name)
    private readonly branchModel: Model<Branch>
  ) {}
  async create(params: CreateBranchDto): Promise<BranchCreatedResponseDto> {
    const { commodityId, storeId, ...rest } = params
    const { id } = await this.branchModel.create({
      commodity: commodityId,
      store: storeId,
      ...rest
    })
    return { id }
  }
  async update(params: UpdateBranchDto) {
    const { id, commodityId, storeId, ...rest } = params    
    await this.branchModel.findByIdAndUpdate(id, {
      commodity: commodityId,
      store: storeId,
      ...rest
    })
    return { status: 'ok' }
  }
  async delete(id: string) {
    return await this.branchModel.findByIdAndDelete(id)
  }
  async searchCommodity2(params: SearchBranchDto): Promise<BranchSearchedResponseDto> {
    const db = this.branchModel
    const {
      curPage = 1,
      pageSize = PAGE_SIZE,
      storeId,
      commodityId,
      categoryId,
      isOnShelf
    } = params
    const query = {
      ...(storeId && { store: storeId }),
      ...(commodityId && { commodity: commodityId }),
      // ...(categoryId && { 'commodity.category': categoryId }),
      ...(isOnShelf !== undefined && { isOnShelf })
    }
    // debugger
    const total = await db.countDocuments(query)
    const data = await db
      .find(query)
      .select('commodity stockConunt soldCount price isOnShelf')
      .populate({
        path: 'commodity',
        select: '-__v -updatedAt -createdAt',
        match: { category: categoryId },
        populate: {
          path: 'category',
          select: 'title'
        }
      })
      .sort({ createdAt: -1 })
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
    const _data = data.map((item) => {
      return item
    })
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: _data as any
    }
  }

  async searchCommodity(params: SearchBranchDto): Promise<BranchSearchedResponseDto> {
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
      {
        $project: {
          'commodity.id': '$commodity._id',
          'commodity.name': 1,
          'commodity.category.title': 1,
          'commodity.category.id': '$commodity.category._id',
          id: '$_id',
          _id: 0,
          stockConunt: 1,
          soldCount: 1,
          price: 1,
          isOnShelf: 1
        }
      }      
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
