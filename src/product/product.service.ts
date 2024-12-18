import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getHello(): object {
    return {
      flag: 1,
      data: {
        msg: 'Hello World!'
      }
    };
  }
}
