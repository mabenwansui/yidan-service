import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from '@/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'log', 'debug', 'verbose', ]
  })
  app.enableCors({
    origin: 'http://localhost:3000', // 允许来自 origin 的请求
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization', 'credentials'], // 允许的请求头
    credentials: true, // 允许发送认证信息（cookies等）
  })
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? config.port)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
