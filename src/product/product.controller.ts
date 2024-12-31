import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { Request, Response } from 'express'
import { JwtAuthGuard } from '@/module/auth/jwt-auth.guard'

@Controller('product')
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @Get()
  getHello(): Object {
    return this.appService.getHello()
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  postExample(@Req() req: Request, @Res() res: Response): void {
    console.log('req', req.body)
    const response = {
      flag: 1,
      data: {
        msg: '1success2333444',
      },
    }
    res.status(200)
    res.send(response)
  }
}
