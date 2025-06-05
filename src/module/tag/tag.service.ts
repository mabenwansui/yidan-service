import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Tag, TagType } from './schemas/tag.schema'
import { WithTimestamps } from '@/common/types/mongo.interface'
import { CreateTagDto } from './dto/create-tag.dto'

import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<WithTimestamps<Tag>>
  ) {}

  async create(createTagDto: CreateTagDto, userId: string) {
    const { isSystem } = createTagDto
    try {
      return await this.tagModel.create({
        ...createTagDto,
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

  async getReMarkList(isAdmin: boolean) {
    const getSystemTags = async () =>
      await this.tagModel
        .find({ type: TagType.REMARK, isSystem: true })
        .select('-creator')
        .sort({ sort: -1, createdAt: -1 })
    const getUserTags = async () =>
      await this.tagModel
        .find({ type: TagType.REMARK, isSystem: false })
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

  async deleteSystemTag(id: string) {
    await this.tagModel.findByIdAndDelete(id)
    return {}
  }

  async deleteUserTag(id: string, userId) {
    await this.tagModel.findOneAndDelete({
      id,
      creator: userId
    })
    return {}
  }
}
