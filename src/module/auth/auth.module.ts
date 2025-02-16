import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Auth, AuthSchema } from './schemas/auth.schemas'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '@/module/user/user.module'
import { JWT_CONSTANTS } from '@/common/constants/secret'
import { JwtAdminStrategy } from './jwt-admin.strategy'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_CONSTANTS.SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [AuthService, JwtAdminStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
