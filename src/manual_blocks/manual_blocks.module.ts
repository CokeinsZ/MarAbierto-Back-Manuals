import { Module } from '@nestjs/common';
import { ManualBlocksService } from './manual_blocks.service';
import { ManualBlocksController } from './manual_blocks.controller';

@Module({
  providers: [ManualBlocksService],
  controllers: [ManualBlocksController]
})
export class ManualBlocksModule {}
