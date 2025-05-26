import { Injectable } from '@nestjs/common'
import { CategoryService } from '@/module/commodity/category/category.service'
import { CommodityService } from '@/module/commodity/commodity/commodity.service'
import { CreateLaoxiangjiDto } from './dto/create-laoxiangji.dto'

@Injectable()
export class MockService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly commodityService: CommodityService
  ) {}
  async onApplicationBootstrap() {
    // await this.createCommodityData(new CreateLaoxiangjiDto())
  }
  async createCommodityData(data: CreateLaoxiangjiDto) {
    for (const item of data.categoryMockData) {
      const doc = await this.categoryService.create({ title: item.title, parentId: item.parentId })
      const { dependencies } = item
      for (const child of dependencies) {
        child.categoryId = doc.id
        await this.commodityService.create(child)
      }
    }
  }
}
