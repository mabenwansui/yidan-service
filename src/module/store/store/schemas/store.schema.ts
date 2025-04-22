import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { StoreInterface } from '../interface/store.interface'
import { City } from '@/common/types/city'
import { CityDto } from '@/common/dto/city.dto'

export type StoreDocument = HydratedDocument<Store>

@Schema({ timestamps: true })
export class Store implements StoreInterface {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  owner?: Types.ObjectId[] // 项目负责人

  @Prop({ type: [String] })
  imgNames?: string[] // 图片

  @Prop()
  coverImageUrl?: string // 封面图片

  @Prop()
  description?: string

  @Prop({ type: [CityDto] })
  city?: City

  @Prop()
  address?: string

  @Prop({ type: Boolean, default: false })
  open?: boolean // 营业状态

  @Prop({ type: { lat: Number, lng: Number } })
  location?: {
    lat: number
    lng: number
  }
}

export const StoreSchema = SchemaFactory.createForClass(Store)
