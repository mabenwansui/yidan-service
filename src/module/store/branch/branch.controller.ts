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
import { BranchService } from './branch.service'
import { CreateBranchDto } from './dto/create-branch.dto'
import { SearchBranchDto } from './dto/find-branch.dto'
import { UpdateBranchDto } from './dto/update-branch.dto'
import { DeleteBranchDto } from './dto/delete-branch.dto'
import { BranchSearchedByStoreResponseDto } from './dto/branch-found-response.dto'
import { BranchCreatedResponseDto } from './dto/branch-created-response.dto'

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: BranchCreatedResponseDto }) 
  @Auth()
  @Post('create')
  async create(@Body() createBranchDto: CreateBranchDto): Promise<BranchCreatedResponseDto> {
    return await this.branchService.create(createBranchDto)
  }

  @Auth(ROLE.ADMIN)
  @Post('update')
  async update(@Body() updateStoreDto: UpdateBranchDto): Promise<Record<never, never>> {
    return await this.branchService.update(updateStoreDto)
  }

  @Auth()
  @Post('delete')
  async delete(@Body() deleteStoreDto: DeleteBranchDto): Promise<Record<never, never>> {
    const { id } = deleteStoreDto
    return await this.branchService.delete(id)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: BranchSearchedByStoreResponseDto })
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('search-commodity')
  async search(@Body() searchBranchDto: SearchBranchDto): Promise<BranchSearchedByStoreResponseDto> {
    return await this.branchService.searchCommodity(searchBranchDto)
  }

  @Post('category-list')
  async getCategory() {
    return await this.branchService.getCategory()
  }
}
