import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { MongooseModule } from '@nestjs/mongoose'
import { TransformResponseInterceptor } from '@/common/interceptors/transformResponse.interceptor'
import { CommodityGroupModule } from '@/module/commodity-group/commodity-group.module'
import { HttpExceptionFilter } from '@/common/exceptionfilters/http.exceptionfilter'
import { UserModule } from '@/module/user/user.module'
import { AuthModule } from '@/module/auth/auth.module'
import { CaptchaModule } from '@/module/captcha/captcha.module'
import { FileModule } from '@/module/file/file.module'
import { MockModule } from '@/module/mock/mock.module'
import { CartModule } from '@/module/cart/cart.module'
import { OrderModule } from '@/module/order/order.module'
import { ConfigModule } from '@nestjs/config'

import config from '@/config'

const mongooseModuleOptions = {
  connectionFactory: (connection) => {
    connection.plugin((schema) => {
      schema.set('toJSON', {
        versionKey: true,
        transform: (doc, ret) => {
          const { _id, ...rest } = ret
          return {
            id: _id,
            ...rest
          }
        }
      })
    })
    return connection
  }
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    ...config.dbs.map((item) => MongooseModule.forRoot(item.uri, mongooseModuleOptions)),
    ServeStaticModule.forRoot({
      rootPath: '.uploadStorage',
      serveRoot: '/file',
      serveStaticOptions: {
        cacheControl: true,
        dotfiles: 'allow'
      }
    }),
    UserModule,
    AuthModule,
    CaptchaModule,
    CommodityGroupModule,
    CartModule,
    OrderModule,
    FileModule,
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
