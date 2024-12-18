import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { TransformResponseInterceptor } from '@/common/interceptors/transformResponse.interceptor'
import { CommodityModule } from './module/commodity/commodity.module'
import { DatabaseExceptionFilter } from '@/common/exceptionfilters/dbConnection.exceptionfilter'
import config from '@/config/db'

@Module({
  imports: [
    ...config.dbs.map((item) => MongooseModule.forRoot(item.uri, config.MongooseModuleOptions)),
    CommodityModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: DatabaseExceptionFilter,
    // }
  ],
})
export class AppModule {}
