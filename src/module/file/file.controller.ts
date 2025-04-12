import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ROLE } from '@/common/constants/role'
import { ImgInterceptor } from './interceptor/img.interceptor'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseInterceptors(ImgInterceptor())
  @Auth(ROLE.ADMIN)
  @Post('upload/img')
  async upload(@Req() request, @UploadedFile() file: Express.Multer.File) {
    return await this.fileService.upload(file)
  }
}
