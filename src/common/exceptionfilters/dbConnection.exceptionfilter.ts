import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { MongoError } from 'mongodb' // 如果是 MongoDB
// import { ApiResponse } from './api-response.interface'; // 引入统一的响应接口

interface ErrorResponse {
  message: { message: Array<string> | string }
}

@Catch(HttpException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const errorResponse = exception.getResponse()
    const errorResponseMessage =
      typeof errorResponse === 'object'
        ? (errorResponse as ErrorResponse).message?.toString()
        : 'unknow error'
    const apiResponse = {
      flag: 0,
      msg: errorResponseMessage,
      code: status,
    }
    response.status(status).json(apiResponse) // 返回统一格式的响应
  }
}
