import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CaptchaModule } from '@/module/captcha/captcha.module'
import { Store, StoreSchema } from './schemas/store.schema'
import { StoreController } from './store.controller'
import { StoreService } from './store.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]), 
    CaptchaModule
  ],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
