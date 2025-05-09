import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { FastifyReply } from 'fastify'

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    // response?.raw?.removeHeader('connection')

    // 设置状态码为200
    response.status(HttpStatus.OK)
    return next.handle().pipe(
      map((data) => {
        return {
          flag: 1, // 成功标志
          data: data || {} // 返回数据
        }
      })
    )
  }
}
