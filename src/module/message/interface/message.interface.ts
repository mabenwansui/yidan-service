import { Types } from 'mongoose'

export interface MessageEvent<DATA = any> {
  id?: string
  data: DATA
  type?: string
  retry?: number
}

interface MessageBase<T = Record<never, never>> {
  storeId: string
  userIds: Types.ObjectId[]
  message: T & {
    title?: string
    content?: string
  }
}
export type JobTypeOrder = MessageBase<{ orderId: string }>
export type JobTypeSystem = MessageBase
export type JobType = JobTypeOrder | JobTypeSystem
export enum JobNameType {
  ORDER_PAID = 'order-paid'
}
