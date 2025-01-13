import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { TransformResponseInterceptor } from '@/common/interceptors/transformResponse.interceptor'
import { CommodityModule } from '@/module/commodity/commodity.module'
import { DatabaseExceptionFilter } from '@/common/exceptionfilters/dbConnection.exceptionfilter'
import { UserModule } from '@/module/user/user.module'
import { AuthModule } from '@/module/auth/auth.module'
import { CaptchaModule } from '@/module/captcha/captcha.module'

import config from '@/config'

const mongooseModuleOptions = {
  connectionFactory: (connection) => {
    connection.plugin((schema) => {
      schema.set('toJSON', {
        versionKey: false,
        transform: (doc, ret) => {
          const { _id, ...rest } = ret
          return {
            id: _id,
            ...rest,
          }
        },
      })
    })
    return connection
  },
}

@Module({
  imports: [
    ...config.dbs.map((item) => MongooseModule.forRoot(item.uri, mongooseModuleOptions)),
    CommodityModule,
    UserModule,
    AuthModule,
    CaptchaModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
  ],
})
export class AppModule {}
