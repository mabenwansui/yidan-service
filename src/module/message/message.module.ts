import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BullModule } from '@nestjs/bullmq'
import { StoreModule } from '@/module/store/store/store.module'
import { UserModule } from '@/module/user/user.module'
import { Message, MessageSchema } from './schemas/message.schema'
import { MessageSystem, MessageSystemSchema } from './schemas/message_system.schema'
import { MessageController } from './message.controller'
import { MessageService } from './service/message.service'
import { MessageDbService } from './service/message-db.service'
import { MessageProcessor } from './message.processor'
import { MessageQueue } from './message.queue'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: MessageSystem.name, schema: MessageSystemSchema }]),
    BullModule.registerQueue({ name: 'message' }),
    StoreModule,
    UserModule
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageDbService, MessageProcessor, MessageQueue],
  exports: [MessageService, MessageDbService]
})
export class MessageModule {}
