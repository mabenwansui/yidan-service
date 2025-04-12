import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { fileType } from '../interface/file.interface'

export type FileDocument = HydratedDocument<File>

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  name: string

  @Prop()
  digest: string // file摘要

  @Prop({ required: true })
  type: fileType // 图片类型

  @Prop({ required: true })
  size: number // 图片大小，单位为字节
}

export const FileSchema = SchemaFactory.createForClass(File)
