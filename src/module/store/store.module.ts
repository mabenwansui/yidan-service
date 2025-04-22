import { Module } from '@nestjs/common'
import { BranchModule } from './branch/branch.module'
import { StoreModule as StoreChild } from './store/store.module'

@Module({
  imports: [BranchModule, StoreChild],
  exports: [BranchModule, StoreChild]
})
export class StoreModule {}
