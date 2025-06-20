import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { BranchPopulate } from '@/module/store/branch/schemas/branch.schema'

export type CartDocument = HydratedDocument<Cart>
type CartItemPopulate = Omit<CartItem, 'branch'> & {
  branch: BranchPopulate
}
export type CartPopulate = Omit<Cart, 'list'> & {
  list: CartItemPopulate[]
}

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
