import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { ProjectInterface } from '../interface/project.interface'

export type ProjectDocument = HydratedDocument<Project>

@Schema({ timestamps: true })
export class Project implements ProjectInterface {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  owner?: Types.ObjectId[] // 项目负责人

  @Prop()
  imgNames?: string[] // 图片

  @Prop()
  coverImageUrl?: string // 封面图片

  @Prop()
  description?: string

  @Prop()
  city?: string

  @Prop()
  address?: string

  @Prop()
  location?: {
    lat: number
    lng: number
  }
}

export const ProjectSchema = SchemaFactory.createForClass(Project)
