import { Module } from '@nestjs/common'
import { MockController } from './mock.controller'
import { MockService } from './mock.service'
import { CommodityModule } from '@/module/commodity/commodity.module'

@Module({
  imports: [CommodityModule],
  controllers: [MockController],
  providers: [MockService]
})
export class MockModule {}
