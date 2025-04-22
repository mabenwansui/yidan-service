import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Branch } from './schemas/branch.schema'
import { CreateBranchDto } from './dto/create-branch.dto'
import { BranchCreatedResponseDto } from './dto/branch-created-response.dto'
import { SearchBranchDto } from './dto/search-branch.dto'

import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name)
    private readonly branchModel: Model<Branch>
  ) {}
  async create(params: CreateBranchDto): Promise<BranchCreatedResponseDto> {
    const { id } = await this.branchModel.create(params)
    return { id }
  }
  async search(params): Promise<any> {
    const db = this.branchModel
    const { curPage, pageSize, ...query } = params
    const total = await db.countDocuments(query)
    const data = await db
      .find(query)
      .populate(['commodityId', 'storeId'])
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
      .lean()
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
}
