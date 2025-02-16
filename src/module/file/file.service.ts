import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { File } from './schemas/file.schema'
import { fileType } from './interface/file.interface'
import * as fs from 'fs'
import logger from '@/common/utils/logger'
import config from '@/config'
import { ImgUploadResponseDto } from './dto/img-upload-response.dto'

const prefixUrl = `https://${config.domain}:${config.port}/file/`

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<File>
  ) {}

  public async upload(file: Express.Multer.File): Promise<ImgUploadResponseDto> {
    const { filename, path, mimetype, size } = file
    const { custom_digest } = file as any
    const data = await this.findOne(custom_digest)
    if (data) {
      const { name } = data
      fs.unlink(path, (error) => {
        if (error) {
          logger.error(error)
        }
      })
      return {
        name,
        url: prefixUrl + name
      }
    } else {
      await this.create({
        name: filename,
        digest: custom_digest,
        size,
        type: mimetype as fileType
      })
      return {
        name: filename,
        url: prefixUrl + filename
      }
    }
  }
  private async findOne(digest: string) {
    return (await this.fileModel.findOne({ digest })) as File
  }

  private async create(file: Omit<File, 'createdAt'>) {
    return await this.fileModel.create({ ...file, createdAt: new Date() })
  }
}
