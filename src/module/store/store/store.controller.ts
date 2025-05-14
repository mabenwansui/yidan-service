import { Body, Controller, Post, Req } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { StoreService } from './store.service'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { DeleteStoreDto } from './dto/delete-store.dto'
import { SearchStoreDto } from './dto/search-store.dto'

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Auth()
  @Post('create')
  async create(@Body() createStoreDto: CreateStoreDto) {
    return await this.storeService.create(createStoreDto)
  }

  @Auth()
  @Post('update')
  async update(@Body() updateStoreDto: UpdateStoreDto) {
    return await this.storeService.update(updateStoreDto)
  }

  @Auth()
  @Post('delete')
  async delete(@Body() deleteStoreDto: DeleteStoreDto) {
    const { id } = deleteStoreDto
    return await this.storeService.delete(id)
  }

  @Auth(ROLE.USER, ROLE.ADMIN)
  @Post('search')
  async search(@Body() searchStoreDto: SearchStoreDto) {
    return await this.storeService.search(searchStoreDto)
  }
}
