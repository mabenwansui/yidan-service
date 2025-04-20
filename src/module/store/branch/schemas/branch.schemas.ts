import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { BranchInterface } from '../interface/branch.interface'

export type BranchDocument = HydratedDocument<Branch>
export enum OPEN_STATUS {
  OPEN = 'open',
  CLOSE = 'close'
}

@Schema({ timestamps: true })
export class Branch implements BranchInterface {
  @Prop({ type: String, required: true })
  storeId: string;

  @Prop({ type: String, required: true })
  commodityId: string;

  @Prop({ type: Number })
  stockConunt?: number;

  @Prop({ type: Number })
  soldCount?: number;

  @Prop({ type: Number })
  price?: number;

  @Prop({ type: Boolean })
  isOnShelf?: boolean;

  constructor() {
    this.isOnShelf = false
  }
}

export const BranchSchema = SchemaFactory.createForClass(Branch)
