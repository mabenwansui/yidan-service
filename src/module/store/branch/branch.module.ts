import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CommodityModule } from '@/module/commodity/commodity.module'
import { Branch, BranchSchema } from './schemas/branch.schema'
import { BranchController } from './branch.controller'
import { BranchService } from './branch.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }]),
    CommodityModule
  ],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService]
})
export class BranchModule {}
