import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Commodity } from './schemas/commodity.schema'
import { CreateCommodityDto } from './dto/create-commodity.dto'
import { SearchCommodityDto } from './dto/search-commodity.dto'
import { CommodityCreatedResponseDto } from './dto/commodity-created-response.dto'
import { CommoditySearchResponseDto } from './dto/commodity-search-response.dto'
import { UpdateCommodityDto } from './dto/update-commodity.dto'
import { DeleteCommodityDto } from './dto/delete-commodity.dto'
import { PAGE_SIZE } from '@/common/constants/page'

const selectForm = 'id name category imgNames originalPrice price description tags soldCount'

@Injectable()
export class CommodityService {
  constructor(
    @InjectModel(Commodity.name)
    private readonly commodityModel: Model<Commodity>
  ) {}

  async create(createCommodityDto: CreateCommodityDto): Promise<CommodityCreatedResponseDto> {
    const result = await this.commodityModel.create({
      ...createCommodityDto
    })
    return result as unknown as CommodityCreatedResponseDto
  }

  async update(updateCommodityDto: UpdateCommodityDto) {
    const { id, ...rest } = updateCommodityDto
    return await this.commodityModel.findByIdAndUpdate(id, { ...rest })
  }

  async delete(deleteCommodityDto: DeleteCommodityDto) {
    const { id } = deleteCommodityDto
    return await this.commodityModel.findByIdAndDelete(id)
  }

  async getInfo(id: string) {
    return await this.commodityModel.findById(id).select(selectForm).populate('category', 'title')
  }

  async search(searchCommodity: SearchCommodityDto): Promise<CommoditySearchResponseDto> {
    const db = this.commodityModel
    const { id, name, categoryId, curPage = 1, pageSize = PAGE_SIZE } = searchCommodity
    const query: any = {}
    if (name) {
      query.name = { $regex: name, $options: 'i' }
    }
    if (id) {
      query.name = id
    }
    if (categoryId) {
      query.category = categoryId
    }
    const total = await db.countDocuments(query)
    const data = await db
      .find(query)
      .select(selectForm)
      .sort({ createdAt: -1 })
      .populate('category', 'id, title')      
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: data
    }
  }
}
