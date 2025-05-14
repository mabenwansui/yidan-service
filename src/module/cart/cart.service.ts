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

  async update(changeCartDto: ChangeCartDto, userId: string): Promise<ResponseCartDto> {
    const db = this.CartModel
    const { commodityId, quantity } = changeCartDto
    const doc = await db.findOne({ userId })
    if (doc) {
      const listIndex = doc.list.findIndex((item) => item.commodity.toString() === commodityId)
      if (listIndex > -1) {
        if (quantity <= 0) {
          doc.list.splice(listIndex, 1)
        } else {
          doc.list[listIndex].quantity = quantity
        }
      } else if (quantity > 0) {
        doc.list.push({ commodity: commodityId, quantity })
      }
      await doc.save()
    } else if (quantity > 0) {
      await db.create({
        userId,
        list: [{ commodity: commodityId, quantity }]
      })
    }
    return {}
  }

  async delete(userId: string) {
    return await this.CartModel.findOneAndDelete({ userId })
  }

  async getList(userId: string) {
    return await this.CartModel.findOne({ userId })
      .select('list')
      .populate('list.commodity', '-__v')
  }
}
