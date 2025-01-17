import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from '@/config'
import * as cookieParser from 'cookie-parser'
import * as fs from 'fs'
import * as path from 'path'

const { port, corsOrigin, domain } = config
const tslKey = fs.readFileSync(path.resolve('./certificates/localhost-key.pem'))
const tslCrt = fs.readFileSync(path.resolve('./certificates/localhost.pem'))

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: tslKey,
      cert: tslCrt,
    },
    // logger: ['error', 'warn', 'log', 'debug', 'verbose', ]
  })
  app.enableCors({
    origin: corsOrigin, // 允许来自 origin 的请求
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization', 'credentials'], // 允许的请求头
    credentials: true, // 允许发送认证信息（cookies等）
  })
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? port, domain)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
