import { Injectable } from '@nestjs/common'
import { generateUuid } from '@/common/utils/generateuuid'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Category } from './schemas/category.schema'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { UpdateCategoryDto } from './dto/updateCategory.dto'
import { DeleteCategoryDto } from './dto/deleteCategory.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.create({
      ...createCategoryDto,
      id: generateUuid()
    })
  }
  async update(updateCategoryDto: UpdateCategoryDto) {
    const { id, name } = updateCategoryDto
    return await this.categoryModel.findByIdAndUpdate(id, { name })
  }
  async delete(deleteCategoryDto: DeleteCategoryDto) {
    return await this.categoryModel.deleteOne(deleteCategoryDto)
  }
}
