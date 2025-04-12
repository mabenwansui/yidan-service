import { Types } from 'mongoose'

export type WithMongoId<T> = T & { _id: Types.ObjectId }