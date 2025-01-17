import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ErrorCode } from '@/common/constants/errorCode'

interface CustomErrorResponse {
  status: number
  code: string
  message: Array<string> | string
}
interface ErrorResponse {
  error: string
  message: Array<string> | string
  statusCode: number
}

@Catch(HttpException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const errorResponse = exception.getResponse() as CustomErrorResponse | ErrorResponse

    const { statusCode, message } = errorResponse as ErrorResponse
    let customCode: string
    let customMessage: Array<string> | string
    if (statusCode) {
      switch (statusCode) {
        case 404:
          customCode = ErrorCode.NOT_FOUND
          break
        case 400:
          customCode = ErrorCode.BAD_REQUEST_DTO
          customMessage = `请求参数错误, ${message}`
          break
        default:
          customCode = statusCode.toString()
      }
      customMessage = customMessage || message
    } else {
      const { message, code } = errorResponse as CustomErrorResponse
      customCode = code
      customMessage = message
    }
    response.status(HttpStatus.OK).json({
      flag: 0,
      msg: Array.isArray(customMessage) ? customMessage[0] : customMessage,
      code: customCode,
    })
  }
}
