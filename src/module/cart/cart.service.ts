import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Branch } from '@/module/store/branch/schemas/branch.schema'
import { Commodity } from '@/module/commodity/commodity/schemas/commodity.schema'
import { Cart } from './schemas/cart.schema'
import { ChangeCartDto } from './dto/change-cart.dto'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'
import { Types } from 'mongoose'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly CartModel: Model<Cart>
  ) {}

  async update(changeCartDto: ChangeCartDto, userId: string) {
    const db = this.CartModel
    const { branchId, quantity } = changeCartDto
    const doc = await db.findOne({ userId })
    if (doc) {
      const listIndex = doc.list.findIndex((item) => item.branch.toString() === branchId)
      if (listIndex > -1) {
        if (quantity <= 0) {
          doc.list.splice(listIndex, 1)
        } else {
          doc.list[listIndex].quantity = quantity
        }
      } else if (quantity > 0) {
        doc.list.push({ branch: new Types.ObjectId(branchId), quantity })
      }
      await doc.save()
    } else if (quantity > 0) {
      await db.create({
        userId,
        list: [{ branch: new Types.ObjectId(branchId), quantity }]
      })
    }
    return {}
  }

  async delete(userId: string) {
    return await this.CartModel.findOneAndDelete({ userId })
  }

  async getList(userId: string) {
    return await this.CartModel.findOne({ userId }).populate({
      path: 'list.branch',
      populate: { path: 'commodity', populate: { path: 'category' } }
    })
  }
}
