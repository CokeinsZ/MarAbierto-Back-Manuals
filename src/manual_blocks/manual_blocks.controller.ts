import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CheckPolicies } from 'src/tools/decorators/check-policies.decorator';
import { Action } from 'src/tools/abilities/ability.factory';
import { ManualBlocksService } from './manual_blocks.service';
import { CreateBulkManualBlocksDto, CreateManualBlockDto } from './dtos/manual_block.dto';
import { ManualBlock } from './interfaces/manual_block.interface';

@Controller('manual-blocks')
@CheckPolicies({ action: Action.Manage, subject: 'ManualBlock' })
export class ManualBlocksController {
    constructor(private readonly service: ManualBlocksService) {}

    @Post()
    async create(@Body() dto: CreateManualBlockDto) {
        return this.service.createManualBlock(dto);
    }

    @Post('bulk')
    async createBulk(@Body() dto: CreateBulkManualBlocksDto) {
        return this.service.createBulkManualBlocks(dto);
    }

    @Get(':block_id')
    async findById(@Param('block_id', ParseIntPipe) block_id: number) {
        return this.service.findById(block_id);
    }

    @Get('manual/:manual_id')
    async findByManualId(@Param('manual_id', ParseIntPipe) manual_id: number) {
        return this.service.findByManualId(manual_id);
    }

    @Put(':block_id')
    async update(
        @Param('block_id', ParseIntPipe) block_id: number,
        @Body() dto: any,
    ) {
        return this.service.updateManualBlock(block_id, dto);
    }

    @Delete(':block_id')
    async delete(@Param('block_id', ParseIntPipe) block_id: number) {
        return this.service.deleteManualBlock(block_id);
    }

}
