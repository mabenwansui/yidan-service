export class CreateCommodityDto {
  name: string; // 商品名称
  tags?: [string]; // 商品标签
  discount?: number; // 折扣
  originalPrice?: number; // 原价
  price: number; // 现价
  description?: string; // 商品描述
  category?: string; // 商品分类
  details?: string; // 商品详情
  imgUrl?: [string]; // 商品图片
  stockConunt?: number; // 商品库存
  soldCount?: number; // 已售
  createdAt?: Date; // 创建时间
  updatedAt?: Date; // 更新时间
}


// export class CreateCommodityDto implements Readonly<CreateCommodityDtoBase> {}
