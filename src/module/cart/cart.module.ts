import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Cart, CartSchema } from './schemas/cart.schema'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
