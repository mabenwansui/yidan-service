import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { MapController } from './map.controller'
import { MapService } from './map.service'
import { TianDiTuService } from './service/tianditu.service'

@Module({
  imports: [HttpModule],
  controllers: [MapController],
  providers: [MapService, TianDiTuService],
})
export class MapModule {}
