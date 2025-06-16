import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import cookie from '@fastify/cookie'
import { AppModule } from './app.module'
import config from '@/config'
import * as fs from 'fs'
import * as path from 'path'

const { port, corsOrigin, domain } = config
const tslKey = fs.readFileSync(path.resolve('./certificates/localhost-key.pem'))
const tslCrt = fs.readFileSync(path.resolve('./certificates/localhost.pem'))

async function bootstrap() {
  const httpsOptions = {
    key: tslKey,
    cert: tslCrt
  }
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      http2: true,
      https: httpsOptions
    })
  )
  app.enableCors({
    origin: corsOrigin, // 允许来自 origin 的请求
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'POST'], // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization', 'credentials', 'X-Requested-With'], // 允许的请求头
    credentials: true, // 允许发送认证信息（cookies等）
    maxAge: 600 // 设置预检请求的有效期（秒）, 避免多次触发OPTIONS
  })  
  app.useStaticAssets({
    root: path.resolve('.uploadStorage'),
    prefix: '/file',
    cacheControl: true,
    dotfiles: 'allow'
  })
  await app.register(cookie)  
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? port, domain)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
