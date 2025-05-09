import { IsNotEmpty, IsBoolean } from 'class-validator'
import { Base } from '../interface/message.interface'

export class CreateBaseMessageDto implements Partial<Base> {
  // 消息标题，必填项
  @IsNotEmpty()
  title: Base['title']

  // 发送者，必填项，类型为 mongoose 的 ObjectId 或特定系统对象
  @IsNotEmpty()
  sender: Base['sender']

  // 接收者 ID，必填项
  @IsNotEmpty()
  receiverId: Base['receiverId']

  // 消息是否已读，必填项，布尔类型
  @IsBoolean()
  isRead?: boolean
}
