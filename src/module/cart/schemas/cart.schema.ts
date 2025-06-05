import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

export type CartDocument = HydratedDocument<Cart>

@Schema()
export class CartItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Branch' })
  branch: Types.ObjectId

  @Prop({ required: true, type: Number })
  quantity: number
}

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true, unique: true })
  userId: string

  @Prop({ type: [CartItem], default: [] })
  list: CartItem[]
}

export const CartSchema = SchemaFactory.createForClass(Cart)
