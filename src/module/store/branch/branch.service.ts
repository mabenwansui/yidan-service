import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { PAGE_SIZE } from '@/common/constants/page'
import { CommodityService } from '@/module/commodity/commodity/commodity.service'
import { CategoryService } from '@/module/commodity/category/category.service'
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
    private readonly branchModel: Model<Branch>,
    private readonly categoryService: CategoryService,
    private readonly commodityService: CommodityService
  ) {}
  async create(params: CreateBranchDto) {
    const { commodityId, storeId, ...rest } = params
    const commodity = await this.commodityService._find({ _id: commodityId })
    const categoryId = commodity[0].category._id
    try {
      return await this.branchModel.create({
        category: categoryId,
        commodity: commodityId,
        store: storeId,
        ...rest
      })
    } catch (e) {
      if (e.code === 11000) {
        logger.error(e)
        throw new HttpException(
          ERROR_MESSAGE.CREATE_BRANCH_UNIQUE_ERROR,
          ERROR_MESSAGE.CREATE_BRANCH_UNIQUE_ERROR.status
        )
      }
    }
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

    const categoryIds = categoryId
      ? (await this.categoryService.getCateoryContainsChildren(categoryId)).map(
          (id) => new Types.ObjectId(id)
        )
      : null

    const pipeline: any = [
      {
        $match: {
          ...(storeId && { store: new Types.ObjectId(storeId) }),
          ...(commodityId && { commodity: new Types.ObjectId(commodityId) }),
          ...(isOnShelf !== undefined && { isOnShelf })
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
      ...(categoryIds
        ? [
            {
              $match: {
                'commodity.category._id': {
                  $in: categoryIds
                }
              }
            }
          ]
        : []),
      { $sort: { createdAt: -1 } },
      { $skip: Math.max(curPage - 1, 0) * pageSize },
      { $limit: pageSize }
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
  async getCategory() {
    const category = await this.categoryService.search()
    const categoryIds = (await this.branchModel.distinct('category')).reduce<any>((o, value) => {
      o[value.toString()] = true
      return o
    }, {})    
    const categoryFilter = category.filter((item) => {
      if (item.level === 0) return true
      return categoryIds[item._id.toString()]
    })
    return {
      list: this.categoryService.transFormFoundData(categoryFilter)[0]?.children || []
    }
  }
  getModel() {
    return this.branchModel
  }
}
