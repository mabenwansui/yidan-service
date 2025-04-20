import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategorySchema } from './schemas/category.schema'
// import { CategoryRelations, CategoryRelationsSchema } from './schemas/category-relations.schema'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
