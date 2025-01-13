import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ErrorCode } from '@/common/constants/errorCode'

interface ErrorResponse {
  status: number
  code: string
  message: { message: Array<string> | string }
}
interface ErrorResponseDto {
  error: string
  message: Array<string>
  statusCode: number
}

@Catch(HttpException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const errorResponse = exception.getResponse() as ErrorResponse | ErrorResponseDto
    let apiResponse
    if ((errorResponse as ErrorResponseDto)?.statusCode) {
      const { message } = errorResponse as ErrorResponseDto
      apiResponse = {
        flag: 0,
        msg: message[0],
        code: ErrorCode.BAD_REQUEST_DTO,
      }
    } else {
      const { message, code } = errorResponse as ErrorResponse
      apiResponse = {
        flag: 0,
        msg: message,
        code,
      }
    }
    response.status(HttpStatus.OK).json(apiResponse) // 返回统一格式的响应
  }
}
