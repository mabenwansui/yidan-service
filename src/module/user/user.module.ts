import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { CaptchaModule } from '@/module/captcha/captcha.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), CaptchaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
