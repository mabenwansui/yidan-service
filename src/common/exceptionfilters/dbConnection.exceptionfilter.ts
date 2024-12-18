import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { MongoError } from 'mongodb' // 如果是 MongoDB
// import { ApiResponse } from './api-response.interface'; // 引入统一的响应接口

@Catch(HttpException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('=---------------------------------------------------')
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    console.log('status', status)

    // const apiResponse: ApiResponse<null> = {
    const apiResponse = {
      success: false,
      message: '222',
      data: null,
      errorCode: '111'
    }

    response.status(status).json(apiResponse) // 返回统一格式的响应
  }
}
