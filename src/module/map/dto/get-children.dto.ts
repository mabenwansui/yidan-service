import { IsString, IsOptional } from 'class-validator';

export class GetChildrenDto {
  /**
   * 用于搜索的关键字
   */
  @IsString()
  @IsOptional()
  keyword?: string
}
