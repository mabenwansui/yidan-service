import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Auth, AuthSchema } from './schemas/auth.schemas'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { HttpModule } from '@nestjs/axios'
import { AuthService } from './service/auth.service'
import { MpAuthService } from './service/mp-auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '@/module/user/user.module'
import { JwtAuthStrategy } from './guard/jwt-auth.strategy'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { RoleAuthGuard } from './guard/role-auth.guard'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    HttpModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [JwtAuthStrategy, JwtAuthGuard, RoleAuthGuard, AuthService, MpAuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
