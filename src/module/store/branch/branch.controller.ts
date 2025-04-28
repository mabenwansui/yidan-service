import { Body, Controller, Post, Req } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { BranchService } from './branch.service'
import { CreateBranchDto } from './dto/create-branch.dto'
import { SearchBranchDto } from './dto/search-branch.dto'
import { DeleteBranchDto } from './dto/delete-branch.dto'

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Auth()
  @Post('create')
  async create(@Body() createBranchDto: CreateBranchDto) {
    return await this.branchService.create(createBranchDto)
  }

  // @Auth()
  // @Post('update')
  // async update(@Body() updateStoreDto: UpdateStoreDto) {
  //   return await this.branchService.update(updateStoreDto)
  // }

  @Auth()
  @Post('delete')
  async delete(@Body() deleteStoreDto: DeleteBranchDto) {
    const { id } = deleteStoreDto
    return await this.branchService.delete(id)
  }

  @Auth(ROLE.ADMIN)
  @Post('search-commodity')
  async search(@Body() searchBranchDto: SearchBranchDto) {
    return await this.branchService.searchCommodity(searchBranchDto)
  }
}
