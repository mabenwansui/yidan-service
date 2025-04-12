import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Cart } from './schemas/cart.schema'
import { ChangeCartDto } from './dto/change-cart.dto'
import { ResponseCartDto } from './dto/response-cart.dto'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly CartModel: Model<Cart>
  ) {}

  async change(params: ChangeCartDto, userId: string): Promise<ResponseCartDto> {
    const db = this.CartModel
    const { commodityId, quantity } = params
    const doc = await db.findOne({ userId })
    if (doc) {
      const listIndex = doc.list.findIndex((item) => item.commodityId.toString() === commodityId)
      if (listIndex > -1) {
        if (quantity <= 0) {
          doc.list.splice(listIndex, 1)
        } else {
          doc.list[listIndex].quantity = quantity
        }
      } else if (quantity > 0) {
        doc.list.push({ commodityId, quantity })
      }
      await doc.save()
    } else if (quantity > 0) {
      await db.create({
        userId,
        list: [{ commodityId, quantity }]
      })
    }
    return {}
  }

  async getList(userId: string) {
    const db = this.CartModel
    const doc = (await db.findOne({ userId })).populate('list.commodityId', '-__v')
    return doc
  }
}
