import {
  Body,
  Controller,
  Post,
  Req,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { TagCreatedResponseDto } from './dto/tag-created-response.dto'
import { CreateTagDto } from './dto/create-tag.dto'
import { SearchTagResponseDto } from './dto/tag-found-response.dto'
import { DeleteDto } from './dto/delete-tag.dto'
import { TagService } from './tag.service'

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: TagCreatedResponseDto }) 
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('create')
  async create(@Req() request, @Body() createTagDto: CreateTagDto) {
    return await this.tagService.create(createTagDto, request.user.sub)
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: SearchTagResponseDto }) 
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('remark/admin/list')
  async getAdminReMarkList() {
    return await this.tagService.getReMarkList(true)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ strategy: 'excludeAll', type: SearchTagResponseDto }) 
  @Auth(ROLE.ADMIN, ROLE.USER)
  @Post('remark/list')
  async getReMarkList() {
    return await this.tagService.getReMarkList(false)
  }  

  @Auth(ROLE.ADMIN)
  @Post('admin/delete')
  async deleteBySystem(@Req() request, @Body() deleteTagDto: DeleteDto): Promise<Record<never, never>> {
    const { id } = deleteTagDto
    return await this.tagService.deleteSystemTag(id)
  }  

  @Auth(ROLE.USER)
  @Post('delete')
  async delete(@Req() request, @Body() deleteTagDto: DeleteDto) {
    const { id } = deleteTagDto
    return await this.tagService.deleteUserTag(id, request.user.sub)
  }
}
