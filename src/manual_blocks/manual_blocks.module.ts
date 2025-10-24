import { Module } from '@nestjs/common';
import { ManualBlocksService } from './manual_blocks.service';
import { ManualBlocksController } from './manual_blocks.controller';
import { DatabaseModule } from 'src/databases/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ManualBlocksService],
  controllers: [ManualBlocksController]
})
export class ManualBlocksModule {}
