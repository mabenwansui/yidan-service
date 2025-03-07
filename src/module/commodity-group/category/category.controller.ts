import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAdminGuard } from '@/module/auth/jwt-admin.guard'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { SearchCategoryDto } from './dto/search-category.dto'
import { SortCategoryDto } from './dto/sort-category.dto'
import { CategoryService } from '../category/category.service'

@Controller('commodity/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAdminGuard)
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto)
  }

  @UseGuards(JwtAdminGuard)
  @Post('update')
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(updateCategoryDto)
  }

  @UseGuards(JwtAdminGuard)
  @Post('delete')
  async delete(@Body() deleteCategoryDto: DeleteCategoryDto) {
    return await this.categoryService.delete(deleteCategoryDto)
  }

  @UseGuards(JwtAdminGuard)
  @Post('list')
  async search(@Body() searchCategoryDto: SearchCategoryDto = {}) {
    return await this.categoryService.search(searchCategoryDto)
  }

  @UseGuards(JwtAdminGuard)
  @Post('sort')
  async sort(@Body() sortCategoryDto: SortCategoryDto) {
    return await this.categoryService.sort(sortCategoryDto)
  }
}
