import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { FoundCategoryDto } from './dto/found-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { SortCategoryDto } from './dto/sort-category.dto'
import { CategoryService } from '../category/category.service'

@Controller('commodity/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  /** 管理员 */
  @Auth(ROLE.ADMIN)
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('update')
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(updateCategoryDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('delete')
  async delete(@Body() deleteCategoryDto: DeleteCategoryDto) {
    return await this.categoryService.delete(deleteCategoryDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('sort')
  async sort(@Body() sortCategoryDto: SortCategoryDto) {
    return await this.categoryService.sort(sortCategoryDto)
  }

  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('form-list')
  async list(@Body() foundCategoryDto: FoundCategoryDto) {
    const { hasRootCategory } = foundCategoryDto
    if (hasRootCategory === true) {
      return await this.categoryService.formList()
    } else {
      return await this.categoryService.list()
    }
  }
}
