import { Module } from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { ManualsController } from './manuals.controller';
import { DatabaseModule } from 'src/databases/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ManualsService],
  controllers: [ManualsController]
})
export class ManualsModule {}
