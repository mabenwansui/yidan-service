import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { insertAfter } from '@/common/utils/array'
import logger from '@/common/utils/logger'
import { Category } from './schemas/category.schema'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { SortCategoryDto } from './dto/sort-category.dto'
import { CategoryCreatedResponseDto } from './dto/category-created-response.dto'
import { CategoryUpdatedResponseItem } from './dto/category-updated-response.dto'
import {
  CategorySearchResponseDto,
  CategoryFoundOneResponse
} from './dto/category-found-response.dto'

type ICategory = Category & { id: string }

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>
  ) {}
  async onApplicationBootstrap() {
    const db = this.categoryModel
    const count = await db.countDocuments()
    if (count === 0) {
      await this.create({ title: '全部' }, true)
    }
  }

  private async search(query: any = {}): Promise<CategorySearchResponseDto> {
    const foundDatas = (await this.categoryModel.find(query)) as ICategory[]
    if (foundDatas.length === 0) {
      return { list: [] }
    }
    function transFormData(datas: Array<ICategory>) {
      const rootDatas = new Array<string>()
      const dataMap = new Map<string, ICategory>()
      datas.forEach((item) => {
        const id = item.id
        dataMap.set(id, item)
        if (item.level === 0) {
          rootDatas.push(id)
        }
      })
      function fn(arr: Array<string>) {
        return arr.map((id) => {
          const { title, childrenIds, parentId, level } = dataMap.get(id)
          const responseData: CategoryFoundOneResponse = { id, title, parentId, level }
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

  /** 包含顶级分类 - 全部 */
  async formList(): Promise<CategorySearchResponseDto> {
    return await this.search()
  }

  /** 不返回顶级分类 - 全部 */
  async list(): Promise<CategorySearchResponseDto> {
    const { list } = await this.search()
    return { list: list[0]?.children || [] }
  }

  async create(
    createCategoryDto: CreateCategoryDto,
    isRoot: boolean = false
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
    let id: string
    let level: number
    if (isRoot === false) {
      const findData = await db.findById(parentId)
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
        const created = await db.create(
          [
            {
              title,
              level,
              parentId,
              childrenIds: []
            }
          ],
          { session }
        )
        id = created[0]._id.toString()
        await db.findByIdAndUpdate(parentId, { $addToSet: { childrenIds: id } }, { session })
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
      const data = await db.create({
        title,
        level,
        parentId,
        childrenIds: []
      })
      id = data._id.toString()
    }
    return {
      id,
      title,
      parentId,
      level
    }
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<CategoryUpdatedResponseItem> {
    const db = this.categoryModel
    const { id, title } = updateCategoryDto
    const doc = await db.findByIdAndUpdate(id, { $set: { title } })
    if (doc) {
      return {
        id: doc.id,
        title: doc.title,
        parentId: doc.parentId,
        level: doc.level
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
    const { parentId } = await db.findById(id)
    const session = await db.startSession()
    session.startTransaction()
    try {
      await db.findByIdAndUpdate(parentId, { $pull: { childrenIds: id } })
      const deleteDoc = await db.findByIdAndDelete(id)
      if (deleteDoc) {
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

  async sort(sortCategoryDto: SortCategoryDto) {
    const db = this.categoryModel
    const { id, targetId, isGap } = sortCategoryDto
    const doc = await db.findById(id)
    if (doc.level === 0 || (targetId === '0' && isGap === true)) {
      throw new HttpException(
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR,
        ERROR_MESSAGE.UPDATE_COMMODITY_CATEGORY_ROOT_ERROR.status
      )
    }
    const dbData = await db.find({})
    const data = dbData.find((item) => item.id === id)
    const targetData = dbData.find((item) => item.id === targetId)
    const parentData = dbData.find((item) => item.id === targetData.parentId)
    if (isGap) {
      if (data.parentId === targetData.parentId) {
        // 同级排序
        let insertArr = parentData.childrenIds.filter((item) => item !== data.id)
        insertArr = insertAfter(insertArr, targetId, data.id)
        await db.findByIdAndUpdate(parentData, { $set: { childrenIds: insertArr } })
      } else {
        // parent.childrenIds 删除子级id
        await db.findByIdAndUpdate(data.parentId, { $pull: { childrenIds: data.id } })
        // 更新当前节点的父级id
        await db.findByIdAndUpdate(data.id, {
          $set: { parentId: targetData.parentId, level: targetData.level }
        })
        // 向新父级的childrenIds插入当前节点id
        // if (targetData.parentId !== '0') {
        // debugger
        const insertArr = insertAfter(parentData.childrenIds, targetId, id)
        await db.findByIdAndUpdate(targetData.parentId, { $set: { childrenIds: insertArr } })
        // }
      }
    } else {
      // parent.childrenIds 删除子级id
      await db.findByIdAndUpdate(data.parentId, { $pull: { childrenIds: data.id } })
      // 更新当前节点的父级id
      await db.findByIdAndUpdate(data.id, {
        $set: { parentId: targetId, level: targetData.level + 1 }
      })
      // 修改父级的childrenIds数组
      await db.findByIdAndUpdate(targetId, {
        $push: { childrenIds: { $each: [id], $position: 0 } }
      })
    }
    return {}
  }
}
