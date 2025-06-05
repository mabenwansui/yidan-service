import { Types } from 'mongoose'

export type WithMongoId<T> = T & { _id: Types.ObjectId }
export type WithTimestamps<T> = T & { createdAt: Date; updatedAt: Date }