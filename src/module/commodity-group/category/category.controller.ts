import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAdminGuard } from '@/module/auth/jwt-admin.guard'
import { CreateCategoryDto } from '../category/dto/createCategory.dto'
import { UpdateCategoryDto } from '../category/dto/updateCategory.dto'
import { DeleteCategoryDto } from './dto/deleteCategory.dto'
import { CategoryService } from '../category/category.service'

@Controller('commodity/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @UseGuards(JwtAdminGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto)
  }

  @Post('update')
  @UseGuards(JwtAdminGuard)
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(updateCategoryDto)
  }

  @Post('update')
  @UseGuards(JwtAdminGuard)
  async delete(@Body() deleteCategoryDto: DeleteCategoryDto) {
    return await this.categoryService.delete(deleteCategoryDto)
  }
}
