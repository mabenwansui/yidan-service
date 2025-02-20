import { Injectable } from '@nestjs/common'
import { generateUuid } from '@/common/utils/generateuuid'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Commodity } from './schemas/commodity.schema'
import { CreateCommodityDto } from './dto/createCommodity.dto'
import { SearchCommodityDto } from './dto/searchCommodity.dto'
import { CommodityCreatedResponseDto } from './dto/commodityCreatedResponse.dto'
import { CommoditySearchResponseDto } from './dto/commoditySearchResponse.dto'
import { UpdateCommodityDto } from './dto/updateCommodity.dto'
import { DeleteCommodityDto } from './dto/deleteCommodity.dto'

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

  async search(searchCommodity: SearchCommodityDto): Promise<CommoditySearchResponseDto> {
    const { search, curPage, pageSize } = searchCommodity
    let query: any = {}
    if (search) {
      query = {
        $text: { $text: { $search: search } }
      }
    }
    const total = await this.commodityModel.countDocuments(query)
    const skip = (curPage - 1) * pageSize
    const data = await this.commodityModel
      .find(query, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(pageSize)
    return {
      total,
      curPage,
      pageSize: pageSize,
      list: data
    }
  }
}

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
