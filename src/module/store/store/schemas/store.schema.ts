import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { StoreInterface } from '../interface/store.interface'
import { AddressSchemas } from '@/common/schemas/address.schemas'

export type StoreDocument = HydratedDocument<Store>

@Schema({ timestamps: true })
export class Store extends AddressSchemas implements Omit<StoreInterface, 'lon' | 'lat'> {
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

  @Prop({ type: Boolean, default: false })
  open?: boolean // 营业状态

  @Prop({ required: true })
  details: string
}

export const StoreSchema = SchemaFactory.createForClass(Store)

StoreSchema.index({ location: '2dsphere' }, { name: 'StoreLocationIndex' })
