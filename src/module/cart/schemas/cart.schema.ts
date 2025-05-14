import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type CartDocument = HydratedDocument<Cart>

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true, unique: true })
  userId: string

  @Prop({
    type: [
      {
        commodity: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Commodity' },
        quantity: { type: Number, required: true }
      }
    ],
    default: []
  })
  list: {
    commodity: string
    quantity?: number
  }[]
}

export const CartSchema = SchemaFactory.createForClass(Cart)
