import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { MapController } from './map.controller'
import { MapService } from './map.service'
import { TianDiTuService } from './service/tianditu.service'
import { TencentService } from './service/tencent.service'

@Module({
  imports: [HttpModule],
  controllers: [MapController],
  providers: [MapService, TianDiTuService, TencentService],
})
export class MapModule {}
