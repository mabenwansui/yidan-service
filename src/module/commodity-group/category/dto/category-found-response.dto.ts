import { BaseResponse } from './base-response'

export class CategoryFoundResponseItem extends BaseResponse {
  children?: Array<CategoryFoundResponseItem>
}

export class CategoryFoundResponseDto {
  list: Array<CategoryFoundResponseItem>
}
