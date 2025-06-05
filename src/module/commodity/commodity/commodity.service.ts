import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PAGE_SIZE } from '@/common/constants/page'
import { WithMongoId } from '@/common/types/mongo.interface'
import { Category } from '@/module/commodity/category/schemas/category.schema'
import { CategoryService } from '@/module/commodity/category/category.service'
import { Commodity } from './schemas/commodity.schema'
import { CreateCommodityDto } from './dto/create-commodity.dto'
import { SearchCommodityDto } from './dto/find-commodity.dto'
import { CommodityCreatedResponseDto } from './dto/commodity-created-response.dto'
import { CommoditySearchResponseDto } from './dto/commodity-found-response.dto'
import { UpdateCommodityDto } from './dto/update-commodity.dto'
import { DeleteCommodityDto } from './dto/delete-commodity.dto'

@Injectable()
export class CommodityService {
  constructor(
    @InjectModel(Commodity.name)
    private readonly commodityModel: Model<Commodity>,
    private readonly categoryService: CategoryService
  ) {}

  async create(createCommodityDto: CreateCommodityDto): Promise<CommodityCreatedResponseDto> {
    const { categoryId, ...rest } = createCommodityDto
    const result = await this.commodityModel.create({
      category: categoryId,
      ...rest
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
    return await this.commodityModel.findById(id).populate<{ category: Category }>('category')
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
      const ids = await this.categoryService.getCateoryContainsChildren(categoryId)
      query.category = { $in: ids }
    }
    const total = await db.countDocuments(query)
    const data = await db
      .find(query)
      .sort({ createdAt: -1 })
      .populate<{ category: Category }>('category')
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)

    return {
      total,
      curPage,
      pageSize: pageSize,
      list: data
    }
  }

  async _find(query: any) {
    return await this.commodityModel.find(query).populate<{ category: WithMongoId<Category> }>('category')
  }
}
