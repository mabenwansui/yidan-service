import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

export enum TagType {
  REMARK = 'remark'
}

@Schema({ timestamps: true })
export class Tag {
  @Prop({ required: true, type: String, enum: TagType })
  type: TagType

  @Prop({ required: true })
  name: string

  @Prop({ required: true, type: Number, default: 0 })
  sort?: number

  @Prop({ required: true, type: Boolean })
  isSystem: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator?: Types.ObjectId
}
export const TagSchema = SchemaFactory.createForClass(Tag)
TagSchema.index({ type: 1, sort: -1, createAt: -1 })
TagSchema.index({ type: 1, isSystem: 1, createAt: -1 })
TagSchema.index({ type: 1, name: 1, creator: 1 }, { unique: true })
