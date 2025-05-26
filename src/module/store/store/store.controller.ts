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
import { StoreService } from './store.service'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { DeleteStoreDto } from './dto/delete-store.dto'
import { SearchStoreDto } from './dto/find-store.dto'
import { StoreCreatedResponseDto } from './dto/store-created-response.dto'
import { StoreSearchResponseDto } from './dto/store-found-response.dto'

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: StoreCreatedResponseDto })
  @Auth()
  @Post('create')
  async create(@Body() createStoreDto: CreateStoreDto): Promise<StoreCreatedResponseDto> {
    return await this.storeService.create(createStoreDto)
  }

  @Auth()
  @Post('update')
  async update(@Body() updateStoreDto: UpdateStoreDto): Promise<Record<never, never>> {
    return await this.storeService.update(updateStoreDto)
  }

  @Auth()
  @Post('delete')
  async delete(@Body() deleteStoreDto: DeleteStoreDto): Promise<Record<never, never>> {
    const { id } = deleteStoreDto
    return await this.storeService.delete(id)
  }

  @Auth()
  @Post('get-near')
  async getNear(@Body() getBranchDto) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: StoreSearchResponseDto })
  @Auth(ROLE.USER, ROLE.ADMIN)
  @Post('search')
  async search(@Body() searchStoreDto: SearchStoreDto) {
    return await this.storeService.search(searchStoreDto)
  }
}
