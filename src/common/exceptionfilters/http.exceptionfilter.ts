import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ERROR_CODE } from '@/common/constants/errorCode'
import { ERROR_MESSAGE } from '../constants/errorMessage'

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
export class HttpExceptionFilter implements ExceptionFilter {
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
          customCode = ERROR_CODE.NOT_FOUND
          break
        case 400:
          customCode = ERROR_CODE.BAD_REQUEST_DTO
          customMessage = `请求参数错误, ${Array.isArray(message) ? message[0] : message}`
          break
        case 413:
          if (exception.name === 'PayloadTooLargeException') {
            customCode = ERROR_MESSAGE.UPLOAD_IMAGE_SIZE_ERROR.code
            customMessage = ERROR_MESSAGE.UPLOAD_IMAGE_SIZE_ERROR.message
          }
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
      code: customCode
    })
  }
}
