import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AbilitiesModule } from './tools/abilities/abilities.module';
import { DatabaseModule } from './databases/database.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './tools/guards/jwt-auth.guard';
import { PoliciesGuard } from './tools/guards/policies.guard';
import { RolesGuard } from './tools/guards/roles.guard';
import { JwtStrategy } from './tools/strategies/jwt.strategy';
import { DatabaseService } from './databases/database.service';
import { ManualsModule } from './manuals/manuals.module';
import { ManualBlocksModule } from './manual_blocks/manual_blocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AbilitiesModule,
    DatabaseModule,
    ManualsModule,
    ManualBlocksModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtStrategy,
    DatabaseService,
  ],
})
export class AppModule {}
