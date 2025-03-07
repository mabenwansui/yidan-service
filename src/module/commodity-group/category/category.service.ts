import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { generateUuid } from '@/common/utils/generateuuid'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import logger from '@/common/utils/logger'
import { Category } from './schemas/category.schema'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { SortCategoryDto } from './dto/sort-category.dto'
import { CategoryCreatedResponseDto } from './dto/category-created-response.dto'
import { CategoryUpdatedResponseItem } from './dto/category-updated-response.dto'
import { CategorySortedResponseDto } from './dto/category-sorted-response.dto'
import {
  CategoryFoundResponseDto,
  CategoryFoundResponseItem
} from './dto/category-found-response.dto'
import { SearchCategoryDto } from './dto/search-category.dto'
import { insertAfter } from '@/common/utils/array'

@Injectable()
export class CategoryService {
  private rootId: string
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>
  ) {
    this.rootId = '0'
  }
  async onApplicationBootstrap() {
    const db = this.categoryModel
    const count = await db.countDocuments()
    if (count === 0) {
      await this.create({ title: '全部' }, this.rootId)
    }
  }

  async search(query: SearchCategoryDto = {}): Promise<CategoryFoundResponseDto> {
    const foundDatas = await this.categoryModel.find(query)
    if (foundDatas.length === 0) {
      return { list: [] }
    }
    function transFormData(datas: Array<Category>) {
      const rootDatas = new Array<string>()
      const dataMap = new Map<string, Category>()
      datas.forEach((item) => {
        dataMap.set(item.id, item)
        if (item.level === 0) {
          rootDatas.push(item.id)
        }
      })
      function fn(arr: Array<string>) {
        return arr.map((id) => {
          const { title, childrenIds, parentId, level } = dataMap.get(id)
          const responseData: CategoryFoundResponseItem = { id, title, parentId, level }
          if (childrenIds?.length > 0) {
            responseData.children = fn(childrenIds)
          }
          return responseData
        })
      }
      return fn(rootDatas)
    }
    return { list: transFormData(foundDatas) }
  }

  async create(
    createCategoryDto: CreateCategoryDto,
    rootId?: string
  ): Promise<CategoryCreatedResponseDto> {
    const db = this.categoryModel
    const { title, parentId = '0' } = createCategoryDto
    const data = await db.findOne({ title })
    if (data) {
      throw new HttpException(
        ERROR_MESSAGE.COMMODITY_CATEGORY_ALREADY_USED,
        ERROR_MESSAGE.COMMODITY_CATEGORY_ALREADY_USED.status
      )
    }
    const id = rootId ? rootId : generateUuid()
    let level: number
    if (!rootId) {
      const findData = await db.findOne({ id: parentId })
      if (!findData) {
        throw new HttpException(
          ERROR_MESSAGE.CREATE_NOT_FOUND_COMMODITY_CATEGORY_PARENT,
          ERROR_MESSAGE.CREATE_NOT_FOUND_COMMODITY_CATEGORY_PARENT.status
        )
      }
      const { level: parentLevel = 0 } = findData
      level = parentLevel + 1
      const session = await db.startSession()
      session.startTransaction()
      try {
        await db.updateOne({ id: parentId }, { $addToSet: { childrenIds: id } }, { session })
        await db.create(
          [
            {
              id,
              title,
              level,
              parentId,
              childrenIds: []
            }
          ],
          { session }
        )
        await session.commitTransaction()
      } catch (e) {
        await session.abortTransaction()
        logger.error(e)
        if (e?.response?.code) {
          throw e
        } else {
          throw new HttpException(
            ERROR_MESSAGE.CREATE_COMMODITY_CATEGORY_ERROR,
            ERROR_MESSAGE.CREATE_COMMODITY_CATEGORY_ERROR.status
          )
        }
      } finally {
        session.endSession()
      }
    } else {
      level = 0
      await db.create({
        id,
        title,
        level,
        parentId,
        childrenIds: []
      })
    }
    return {
      id,
      title,
      parentId,
      level
    }
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<CategoryUpdatedResponseItem> {
    const { id, title } = updateCategoryDto
    if (id === this.rootId) {
      throw new HttpException(
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR,
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR.status
      )
    }
    const result = await this.categoryModel.findOneAndUpdate({ id }, { $set: { title } })
    if (result) {
      return {
        id: result.id,
        title: result.title,
        parentId: result.parentId,
        level: result.level
      }
    } else {
      throw new HttpException(
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ERROR,
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ERROR.status
      )
    }
  }

  async delete(deleteCategoryDto: DeleteCategoryDto) {
    const db = this.categoryModel
    const { id } = deleteCategoryDto
    if (id === this.rootId) {
      throw new HttpException(
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR,
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR.status
      )
    }
    const { parentId } = await db.findOne({ id })
    const session = await db.startSession()
    session.startTransaction()
    try {
      await db.updateOne({ id: parentId }, { $pull: { childrenIds: id } })
      const { deletedCount } = await this.categoryModel.deleteOne(deleteCategoryDto)
      if (deletedCount > 0) {
        await session.commitTransaction()
        return {}
      } else {
        throw new HttpException(
          ERROR_MESSAGE.DELETE_NOT_FOUND_COMMODITY_CATEGORY,
          ERROR_MESSAGE.DELETE_NOT_FOUND_COMMODITY_CATEGORY.status
        )
      }
    } catch (e) {
      await session.abortTransaction()
      logger.error(e)
      if (e?.response?.code) {
        throw e
      } else {
        throw new HttpException(
          ERROR_MESSAGE.DELETE_COMMODITY_CATEGORY_ERROR,
          ERROR_MESSAGE.DELETE_COMMODITY_CATEGORY_ERROR.status
        )
      }
    } finally {
      session.endSession()
    }
  }

  async sort(sortCategoryDto: SortCategoryDto): Promise<CategorySortedResponseDto> {
    const { id, targetId, isGap } = sortCategoryDto
    if (id === this.rootId || (targetId === '0' && isGap === true)) {
      throw new HttpException(
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR,
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR.status
      )
    }
    const db = this.categoryModel
    const dbData = await db.find({})
    const data = dbData.find((item) => item.id === id)
    const targetData = dbData.find((item) => item.id === targetId)
    const parentData = dbData.find((item) => item.id === targetData.parentId)
    if (isGap) {
      if (data.parentId === targetData.parentId) {
        // 同级排序
        let insertArr = parentData.childrenIds.filter((item) => item !== data.id)
        insertArr = insertAfter(insertArr, targetId, data.id)
        await db.updateOne({ id: parentData.id }, { $set: { childrenIds: insertArr } })
      } else {
        // parent.childrenIds 删除子级id
        await db.updateOne({ id: data.parentId }, { $pull: { childrenIds: data.id } })
        // 更新当前节点的父级id
        await db.updateOne(
          { id: data.id },
          { $set: { parentId: targetData.parentId, level: targetData.level } }
        )
        // 向新父级的childrenIds插入当前节点id
        // if (targetData.parentId !== '0') {
        // debugger
        const insertArr = insertAfter(parentData.childrenIds, targetId, id)
        await db.updateOne({ id: targetData.parentId }, { $set: { childrenIds: insertArr } })
        // }
      }
    } else {
      // parent.childrenIds 删除子级id
      await db.updateOne({ id: data.parentId }, { $pull: { childrenIds: data.id } })
      // 更新当前节点的父级id
      await db.updateOne(
        { id: data.id },
        { $set: { parentId: targetId, level: targetData.level + 1 } }
      )
      // 修改父级的childrenIds数组
      await db.updateOne(
        { id: targetId },
        { $push: { childrenIds: { $each: [id], $position: 0 } } }
      )
    }
    return {}
  }
}
