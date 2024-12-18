import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          flag: 1, // 成功标志
          data: data || {}, // 返回数据
          msg: '', // 成功时无错误信息
          code: 200, // HTTP 200 表示成功
        }
      }),
      catchError((error) => {
        console.log('error::::::::', error)
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error3333',
        }, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: error
        })
        // 捕获异常并自定义返回结构
        // throw {
        //   flag: 0, // 错误标志
        //   data: {}, // 错误时无数据
        //   msg: error.message || '请求出错', // 错误信息
        //   code: error.status || 500, // HTTP 状态码或默认 500
        // }
      }),
    )
  }
}
