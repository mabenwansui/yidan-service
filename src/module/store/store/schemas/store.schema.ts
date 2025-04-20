import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { StoreInterface } from '../interface/store.interface'

export type StoreDocument = HydratedDocument<Store>
export enum OPEN_STATUS {
  OPEN = 'open',
  CLOSE = 'close'
}

@Schema({ timestamps: true })
export class Store implements StoreInterface {
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
  open?: OPEN_STATUS.OPEN | OPEN_STATUS.CLOSE

  @Prop()
  location?: {
    lat: number
    lng: number
  }
}

export const StoreSchema = SchemaFactory.createForClass(Store)
