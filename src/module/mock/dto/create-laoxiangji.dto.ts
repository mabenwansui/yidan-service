import { CreateCategoryDto } from '@/module/commodity/category/dto/create-category.dto'
import { CreateCommodityDto } from '@/module/commodity/commodity/dto/create-commodity.dto'

class CreateCategory extends CreateCategoryDto {
  dependencies?: CreateCommodityDto[]
}

function generateMockData(data, total = 20) {
  const arr = []
  for (let i = 1; i <= total; i++) {
    arr.push({
      ...data,
      name: data.name + i
    })
  }
  return arr
}

export class CreateLaoxiangjiDto {
  categoryMockData: CreateCategory[]

  constructor(parentId = '67dbc70867a3d5f0c58d3228') {
    this.categoryMockData = [
      {
        title: '拿手菜',
        parentId,
        dependencies: generateMockData({
          name: '香酥肉丝',
          originalPrice: 36,
          price: 30,
          description: '香酥肉丝',
          details: '好吃',
          stockConunt: 999,
          soldCount: 1000
        })
      },
      {
        title: '超值套餐',
        parentId,
        dependencies: generateMockData({
          name: '肉未茄子',
          originalPrice: 30,
          price: 26,
          description: '肉未茄子',
          details: '便宜',
          stockConunt: 999,
          soldCount: 900
        })
      }
      // {
      //   title: '下饭好菜'
      // },
      // {
      //   title: '锅气现炒'
      // },
      // {
      //   title: '健康时蔬'
      // },
      // {
      //   title: '主食'
      // },
      // {
      //   title: '美味小食'
      // },
      // {
      //   title: '酒水饮料'
      // },
      // {
      //   title: '营养蛋品'
      // },
      // {
      //   title: '现蒸面点'
      // }
    ]
  }
}
