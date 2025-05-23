import { Types } from 'mongoose'
import { AddressLocationInterface } from '@/common/types/address.interface'
import { UserInterface } from '@/module/user/interface/user.interface'

export type OwnerPopulate = UserInterface

export interface StoreInterface extends AddressLocationInterface {  
  /** 项目名称，必须且唯一 */
  name: string
  /** 项目负责人，存储用户的 ObjectId 数组 */
  owner?: Types.ObjectId[]
  /** 图片名称数组，可选字段 */
  imgNames?: string[]
  /** 封面图片的 URL，可选字段 */
  coverImageUrl?: string
  /** 项目描述，可选字段 */
  description?: string
}
