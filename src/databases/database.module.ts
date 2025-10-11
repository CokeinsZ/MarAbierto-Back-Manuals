import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ManualsRepository } from './repositories/manuals/manuals.repository';
import { ManualBlocksRepository } from './repositories/manual_blocks/manual_blocks.repository';

@Module({
  providers: [
    DatabaseService,
    ManualsRepository, 
    ManualBlocksRepository
  ],
  exports: [
    DatabaseService,
    ManualsRepository,
    ManualBlocksRepository
  ],
})
export class DatabaseModule {}
