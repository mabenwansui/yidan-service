import { ProjectInterface } from '../interface/project.interface'
import { Types } from 'mongoose';
import { IsString, IsArray, IsOptional, IsObject, IsDate, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto implements ProjectInterface {
  /** 项目名称，必须且唯一 */
  @IsString()
  @IsNotEmpty()
  name: string;

  /** 项目描述，可选字段 */
  @IsString()
  @IsOptional()
  description?: string;

  /** 项目负责人，存储用户的 ObjectId 数组 */
  @IsArray()
  @IsNotEmpty()
  owner?: Types.ObjectId[];

  /** 图片名称数组，可选字段 */
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imgNames?: string[];

  /** 封面图片的 URL，可选字段 */
  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  /** 项目所在城市，可选字段 */
  @IsString()
  @IsOptional()
  city?: string;

  /** 项目地址，可选字段 */
  @IsString()
  @IsOptional()
  address?: string;

  /** 项目地理位置，包含纬度和经度，可选字段 */
  @Type(() => Object)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  location?: {
    lat: number;
    lng: number;
  };
}
