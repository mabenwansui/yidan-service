import { Module } from '@nestjs/common'
import { MockController } from './mock.controller'
import { MockService } from './mock.service'
import { CommodityGroupModule } from '@/module/commodity-group/commodity-group.module'

@Module({
  imports: [CommodityGroupModule],
  controllers: [MockController],
  providers: [MockService]
})
export class MockModule {}
