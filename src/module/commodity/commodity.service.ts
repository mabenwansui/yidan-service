import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCommodityDto } from './dto/createCommodity.dto'
import { CommodityCreatedResponseDto } from './dto/commodityCreatedResponse.dto'
import { Commodity } from './schemas/commodity.schema'
import { AuthModule } from '@/module/auth/auth.module'


@Injectable()
export class CommodityService {
  private readonly logger = new Logger(CommodityService.name);
  constructor(
    @InjectModel(Commodity.name)
    private readonly commodityModel: Model<Commodity>,
  ) {}

  async create(createCatDto: CreateCommodityDto): Promise<CommodityCreatedResponseDto> {
    this.logger.log(`createCatDto----------------:${JSON.stringify(createCatDto)}`)
    const createdCat = await this.commodityModel.create(createCatDto)
    return createdCat
  }

  async findAll(): Promise<Commodity[]> {
    const result = await this.commodityModel.find().exec()
    return result
  }

  async findOne(name: number): Promise<Commodity> {
    return this.commodityModel.findOne({ name: name }).exec()
  }

  // async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
  //   return this.catModel
  //     .findByIdAndUpdate({ _id: id }, updateCatDto, { new: true })
  //     .exec();
  // }

  // async delete(id: string): Promise<Commodity> {
  //   const deletedCat = await this.catModel
  //     .findByIdAndDelete({ _id: id })
  //     .exec();
  //   return deletedCat;
  // }
}
