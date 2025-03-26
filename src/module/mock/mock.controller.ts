import { Controller, Post } from '@nestjs/common'
import { MockService } from './mock.service'
import { CreateLaoxiangjiDto } from './dto/create-laoxiangji.dto'

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}
  @Post('create-commodity-data')
  async createCategory() {
    debugger
    this.mockService.createCommodityData(new CreateLaoxiangjiDto())
  }
}
