import { HttpException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UPLOAD_DEST } from '@/common/constants/uploadDest'
import { ERROR_MESSAGE } from '@/common/constants/errorMessage'
import { generateUuid } from '@/common/utils/generateuuid'
import * as multer from 'multer'
import * as crypto from 'crypto'

const fileSize = 5 * 1024 * 1021 // (单位字节)5MB
const suffixMapping = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
}

function validMimeType(mimetype: string) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif']
  return validTypes.includes(mimetype)
}

export function ImgInterceptor() {
  return FileInterceptor('img', {
    fileFilter: (req, file, cb) => {
      if (!validMimeType(file.mimetype)) {
        return cb(
          new HttpException(
            ERROR_MESSAGE.UPLOAD_IMAGE_MIMETYPE_ERROR,
            ERROR_MESSAGE.UPLOAD_IMAGE_MIMETYPE_ERROR.status
          ),
          false
        )
      }
      return cb(null, true)
    },
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, UPLOAD_DEST.MAIN_IMG),
      filename: (req, file, cb) => {
        const hash = crypto.createHash('sha256')
        const fileName = generateUuid() + '.' + suffixMapping[file.mimetype]
        cb(null, fileName)
        const { stream } = file
        stream.on('data', (chunk) => hash.update(chunk))
        stream.on('end', () => {
          ;(file as any).custom_digest = hash.digest('hex')
        })
      }
    }),
    limits: { fileSize }
  })
}
