import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { AddressSchemas } from '@/common/schemas/address.schemas'
import { WithMongoId } from '@/common/types/mongo.interface'
import { UserPopulate } from '@/module/user/schemas/user.schema'

export type StoreDocument = HydratedDocument<Store>

export type StorePopulate = WithMongoId<Omit<Store, 'owner'> & {
  owner: UserPopulate[]
}>

@Schema({ timestamps: true })
export class Store extends AddressSchemas {
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
}

export const StoreSchema = SchemaFactory.createForClass(Store)

StoreSchema.index({ location: '2dsphere' })
