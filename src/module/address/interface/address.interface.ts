export interface AddressInterface {
  /** 用户 ID，必填 */
  userId: string
  /** 收件人，必填 */
  receiver: string  
  /** 城市，必填 */
  city: string
  /** 区域，必填 */
  address: string
  /** 联系电话，必填 */
  phoneNumber: string
  /** 地址标签, 家、公司 */
  title: string
  /** 是否为默认地址，默认为 false */
  isDefault: boolean
}
