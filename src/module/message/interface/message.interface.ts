import { OrderInterface } from '@/module/order/interface/order.interface'
import { UserInterface } from '@/module/user/interface/user.interface'

export enum MessageType {
  DEFAULT ='default',
  ORDER = 'order'
}

export interface Base {
  title: string
  createdAt: Date
  sender: UserInterface | { id: 'system' }
  receiverId: string
  isRead: boolean
}

export interface OrderMessage extends Base {
  type: MessageType.ORDER
  content: OrderInterface
}

export interface DefaultMessage extends Base {
  type: MessageType.DEFAULT
  content: string
}

export type Message = OrderMessage | DefaultMessage