import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { CategoryService } from '../category/category.service'
import { SearchCategoryDto } from './dto/find-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { SortCategoryDto } from './dto/sort-category.dto'
import { CategoryFoundOneResponse, CategorySearchResponseDto } from './dto/category-found-response.dto'

@Controller('commodity/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: CategoryFoundOneResponse })
  @Auth(ROLE.ADMIN)
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryFoundOneResponse> {
    return await this.categoryService.create(createCategoryDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: CategoryFoundOneResponse })
  @Auth(ROLE.ADMIN)
  @Post('update')
  async update(@Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryFoundOneResponse> {
    return await this.categoryService.update(updateCategoryDto)
  }
  
  @Auth(ROLE.ADMIN)
  @Post('delete')
  async delete(@Body() deleteCategoryDto: DeleteCategoryDto): Promise<Record<never, never>> {
    return await this.categoryService.delete(deleteCategoryDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('sort')
  async sort(@Body() sortCategoryDto: SortCategoryDto): Promise<Record<never, never>> {
    return await this.categoryService.sort(sortCategoryDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: CategorySearchResponseDto })  
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('form-list')
  async formList(@Body() searchCategoryDto: SearchCategoryDto): Promise<CategorySearchResponseDto> {
    const { hasRootCategory } = searchCategoryDto
    if (hasRootCategory === true) {
      return await this.categoryService.formList()
    } else {
      return await this.categoryService.list()
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: CategorySearchResponseDto })  
  @Post('list')
  async list(): Promise<CategorySearchResponseDto> {
    return await this.categoryService.list()
  }
}
