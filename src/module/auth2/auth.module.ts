import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '@/module/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy2 } from './local.strategy'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '@/common/constants/secret'
import { JwtStrategy2 } from './jwt.strategy'

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    })    
  ],
  providers: [AuthService, LocalStrategy2, JwtStrategy2],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
