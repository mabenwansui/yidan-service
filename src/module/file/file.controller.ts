import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common'
import { JwtAdminGuard } from '@/module/auth/jwt-admin.guard'
import { ImgInterceptor } from './interceptor/img.interceptor'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload/img')
  @UseGuards(JwtAdminGuard)
  @UseInterceptors(ImgInterceptor())
  async upload(@Req() request, @UploadedFile() file: Express.Multer.File) {
    return await this.fileService.upload(file)
  }
}
