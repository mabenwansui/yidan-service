import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { BullModule } from '@nestjs/bullmq'
import config from '@/config'
import { TransformResponseInterceptor } from '@/common/interceptors/transformResponse.interceptor'
import { HttpExceptionFilter } from '@/common/exceptionfilters/http.exceptionfilter'
import { CommodityModule } from '@/module/commodity/commodity.module'
import { UserModule } from '@/module/user/user.module'
import { AuthModule } from '@/module/auth/auth.module'
import { CaptchaModule } from '@/module/captcha/captcha.module'
import { FileModule } from '@/module/file/file.module'
import { MockModule } from '@/module/mock/mock.module'
import { CartModule } from '@/module/cart/cart.module'
import { MapModule } from '@/module/map/map.module'
import { StoreModule } from '@/module/store/store.module'
import { OrderModule } from '@/module/order/order.module'
import { MessageModule } from '@/module/message/message.module'
import { CouponModule } from '@/module/coupon/coupon.module'
import { AddressModule } from '@/module/address/address.module'
import { TagModule } from '@/module/tag/tag.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(config.mongo),
    BullModule.forRoot(config.redis),
    MapModule,
    FileModule,
    MessageModule,
    UserModule,
    AuthModule,
    StoreModule,
    CaptchaModule,
    CommodityModule,
    CartModule,
    OrderModule,
    CouponModule,
    AddressModule,
    TagModule,
    MockModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
