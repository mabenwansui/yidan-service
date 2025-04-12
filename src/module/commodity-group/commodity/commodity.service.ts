import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { WithMongoId } from '@/common/types'
import { Commodity } from './schemas/commodity.schema'
import { CreateCommodityDto } from './dto/create-commodity.dto'
import { SearchCommodityDto } from './dto/search-commodity.dto'
import { CommodityCreatedResponseDto } from './dto/commodity-created-response.dto'
import { CommoditySearchResponseDto } from './dto/commodity-search-response.dto'
import { UpdateCommodityDto } from './dto/update-commodity.dto'
import { DeleteCommodityDto } from './dto/delete-commodity.dto'

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

  async findById(id: string) {
    return await this.commodityModel.findById(id).select(selectForm).populate('category', 'title')
  }

  async search(searchCommodity: SearchCommodityDto): Promise<CommoditySearchResponseDto> {
    const { search, category, curPage = 1, pageSize = 30 } = searchCommodity
    const query: any = {}
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }
    if (category) {
      query.category = category
    }
    const total = await this.commodityModel.countDocuments(query)
    const data = await this.commodityModel
      .find(query)
      .select(selectForm)
      .populate('category', 'id, title' )
      .skip(Math.max(curPage - 1, 0) * pageSize)
      .limit(pageSize)
      .lean()
    const _data = data.map((item) => {
      const { _id, category, ...rest } = item
      item.coverImageUrl = item.coverImageUrl || item.imgNames[0]
      return {
        id: _id,
        commodityId: _id,
        // 通过populate返回的category是一个对象, 里面包含_id和title
        category: (category as unknown as WithMongoId<{ title: string }>).title,
        categoryId: (category as unknown as WithMongoId<{ title: string }>)._id,
        ...rest
      }
    })    
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: _data as any
    }
  }
}

// async search(searchCommodity: SearchCommodityDto): Promise<CommoditySearchResponseDto> {
//   const { search, curPage, pageSize } = searchCommodity
//   let query: any = {}
//   if (search) {
//     query = {
//       $text: { $search: search }
//     }
//   }
//   const total = await this.commodityModel.countDocuments(query)
//   const skip = (curPage - 1) * pageSize
//   const data = await this.commodityModel
//     .find(query, { score: { $meta: 'textScore' } })
//     .sort({ score: { $meta: 'textScore' } })
//     .skip(skip)
//     .limit(pageSize)
//   return {
//     total,
//     curPage,
//     pageSize: pageSize,
//     list: data
//   }
// }

// ;(Object.keys(searchCommodity) as Array<keyof SearchCommodityDto>).forEach((key) => {
//   if (searchCommodity[key] !== undefined) {
//     switch (key) {
//       case 'curPage':
//       case 'pageSize':
//         break
//       case 'minPrice':
//         query[key] = { $gte: searchCommodity[key] }
//         break
//       case 'maxPrice':
//         query[key] = { $lte: searchCommodity[key] }
//       default:
//         query[key] = searchCommodity[key]
//     }
//   }
// })
// const data = await this.commodityModel
//   .aggregate([
//     {
//       $lookup: {
//         from: 'categories',
//         localField: 'category',
//         foreignField: '_id',
//         as: 'categoryInfo' // 结果数组字段
//       }
//     },
//     {
//       $unwind: {
//         path: '$categoryInfo',
//         preserveNullAndEmptyArrays: true // 保持空数组，避免文档丢失
//       }
//     },
//     {
//       $project: {
//         _id: 0,
//         id: { $toString: '$_id' },
//         name: 1,
//         category: '$categoryInfo.title', // 提取分类名称
//         imgNames: 1,
//         originalPrice: 1,
//         price: 1,
//         description: 1,
//         tags: 1,
//         updatedAt: 1
//       }
//     }
//   ])
//   .skip((curPage - 1) * pageSize)
//   .limit(pageSize)
