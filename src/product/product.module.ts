import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { AuthModule } from '@/module/auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
