import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { File, FileSchema } from './schemas/file.schema'
import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: File.name, schema: FileSchema }])],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
