import { Injectable } from '@nestjs/common'
import { generateUuid } from '@/common/utils/generateuuid'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Commodity } from './schemas/commodity.schema'
import { CreateCommodityDto } from './dto/create-commodity.dto'
import { SearchCommodityDto } from './dto/search-commodity.dto'
import { CommodityCreatedResponseDto } from './dto/commodity-created-response.dto'
import { CommoditySearchResponseDto } from './dto/commodity-search-response.dto'
import { UpdateCommodityDto } from './dto/update-commodity.dto'
import { DeleteCommodityDto } from './dto/delete-commodity.dto'

@Injectable()
export class CommodityService {
  constructor(
    @InjectModel(Commodity.name)
    private readonly commodityModel: Model<Commodity>
  ) {}

  async create(createCommodityDto: CreateCommodityDto): Promise<CommodityCreatedResponseDto> {
    const date = new Date()
    const result = await this.commodityModel.create({
      ...createCommodityDto,
      id: generateUuid(),
      createdAt: date,
      updatedAt: date
    })
    return result as unknown as CommodityCreatedResponseDto
  }

  async update(updateCommodityDto: UpdateCommodityDto) {
    return await this.commodityModel.findByIdAndUpdate(updateCommodityDto.id, {
      ...updateCommodityDto,
      updatedAt: new Date()
    })
  }

  async delete(deleteCommodityDto: DeleteCommodityDto) {
    return await this.commodityModel.deleteOne(deleteCommodityDto)
  }

  async findById(id: string) {
    return (await this.commodityModel.findById(id)).populate('category', 'title')
  }

  async search(searchCommodity: SearchCommodityDto): Promise<CommoditySearchResponseDto> {
    const { search, curPage = 1, pageSize = 30 } = searchCommodity
    let query: any = {}
    if (search) {
      query = {
        name: { $regex: search, $options: 'i' }
      }
    }
    const total = await this.commodityModel.countDocuments(query)
    const data = await this.commodityModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: 'id',
          as: "categoryInfo"    // 结果数组字段
        }
      },
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true  // 保持空数组，避免文档丢失
        }          
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          category: "$categoryInfo.title",  // 提取分类名称
          imgNames: 1,
          originalPrice: 1,
          price: 1,
          description: 1,
          tags: 1,
          updatedAt: 1
        }
      }      
    ]).skip((curPage - 1) * pageSize).limit(pageSize)
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: data
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
