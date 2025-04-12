export interface CommodityInterface {
  name: string; // 名称
  category?: string; // 分类
  categoryId?: string
  imgNames?: string[]; // 图片
  coverImageUrl?: string; // 封面图片
  originalPrice?: number; // 原价
  price: number; // 现价
  description?: string; // 描述
  details?: string; // 详情
  tags?: string[]; // 标签
  stockCount?: number; // 库存
  soldCount?: number; // 已售
}
