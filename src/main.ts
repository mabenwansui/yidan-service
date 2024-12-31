import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from '@/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error']
  })
  app.enableCors({
    origin: 'http://localhost:3000', // 允许来自 localhost:4000 的请求
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: true, // 允许发送认证信息（cookies等）
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? config.port)
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap()
