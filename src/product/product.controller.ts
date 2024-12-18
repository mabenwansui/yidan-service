import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request, Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @Get()
  getHello(): Object {
    return this.appService.getHello();
  }

  @Post('/')
  postExample(@Req() req: Request, @Res() res: Response): void {
    console.log('req', req.body)
    const response = {
      flag: 1,
      data: {
        msg: '1success2333444',
      }
    }
    res.status(200);
    res.send(response);
  }
}
