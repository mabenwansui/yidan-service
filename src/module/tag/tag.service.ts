import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Tag, TagType } from './schemas/tag.schema'
import { WithTimestamps } from '@/common/types/mongo.interface'
import { CreateTagDto } from './dto/create-tag.dto'
import { SortTagDto } from './dto/sort-tag.dto'

import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'

const sortStep = 1000

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<WithTimestamps<Tag>>
  ) {}

  async onApplicationBootstrap() {
    this.resetRemarkSort()
  }

  async create(createTagDto: CreateTagDto & { isSystem: boolean }, userId: string) {
    const { type, isSystem } = createTagDto
    try {
      const total = await this.tagModel.countDocuments({ type, isSystem })
      const sort = total * sortStep + sortStep
      return await this.tagModel.create({
        ...createTagDto,
        sort,
        creator: isSystem ? null : userId
      })
    } catch (e) {
      logger.error(e)
      if (e.code === 11000) {
        throw new HttpException(
          ERROR_MESSAGE.CREATE_TAG_UNIQUE_ERROR,
          ERROR_MESSAGE.CREATE_TAG_UNIQUE_ERROR.status
        )
      }
    }
  }

  async deleteSystemTag(id: string) {
    await this.tagModel.findByIdAndDelete(id)
    return {}
  }

  async deleteUserTag(id: string, userId: string) {
    const doc = await this.tagModel.findOneAndDelete({ _id: id, creator: userId })
    if (!doc) {
      throw new HttpException(ERROR_MESSAGE.DELETE_TAG_ERROR, ERROR_MESSAGE.DELETE_TAG_ERROR.status)
    }
    return {}
  }

  async getReMarkList(isAdmin: boolean, userId?: string) {
    const getSystemTags = async () =>
      await this.tagModel
        .find({ type: TagType.REMARK, isSystem: true })
        .select('-creator')
        .sort({ sort: -1, createdAt: -1 })
    const getUserTags = async () =>
      await this.tagModel
        .find({ type: TagType.REMARK, isSystem: false, creator: userId })
        .populate('creator')
        .sort({ sort: -1, createdAt: -1 })
    if (isAdmin === true) {
      return {
        list: await getSystemTags()
      }
    } else {
      const [systemTags, userTags] = await Promise.all([await getSystemTags(), await getUserTags()])
      return {
        list: [...userTags, ...systemTags]
      }
    }
  }

  async sortRemark(sortTagDto: SortTagDto) {
    const { type, isSystem, active, over } = sortTagDto
    const filter = { type, isSystem }
    const isMovingDown = active.sort > over.sort
    const sortCondition = isMovingDown ? { sort: { $lt: over.sort } } : { sort: { $gt: over.sort } }
    const sortOrder = isMovingDown ? -1 : 1
    const neighbor = await this.tagModel
      .findOne({ ...filter, ...sortCondition })
      .sort({ sort: sortOrder })
    const insertSort = neighbor
      ? (over.sort + neighbor.sort) / 2
      : over.sort + (isMovingDown ? -1 : 1)
    await this.tagModel.findByIdAndUpdate(active.id, { sort: insertSort })
    return {}
  }

  private async resetRemarkSort() {
    const filter = { type: TagType.REMARK, isSystem: true }
    const tags = await this.tagModel.find(filter).sort({ sort: 1 })
    const baseSort = 1000
    const step = sortStep
    const bulkOps = tags.map((tag, index) => ({
      updateOne: {
        filter: { _id: tag._id },
        update: { sort: baseSort + index * step }
      }
    }))
    if (bulkOps.length > 0) {
      await this.tagModel.bulkWrite(bulkOps)
    }
    return { message: '排序字段已重置', count: tags.length }
  }
}
