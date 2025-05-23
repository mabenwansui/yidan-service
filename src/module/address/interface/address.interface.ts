import { AddressLocationInterface } from '@/common/types/address.interface'
import { SexType } from '@/common/types/user.interface'

export interface AddressInterface extends AddressLocationInterface {
  id?: string
  /** 用户 ID，必填 */
  userId: string
  /** 联系人，必填 */
  contactName: string
  /** 性别 */
  sex: SexType
  /** 联系电话，必填 */
  phoneNumber: string
  /** 地址标签, 家、公司 */
  title: string
  /** 是否为默认地址，默认为 false */
  isDefault: boolean
}
