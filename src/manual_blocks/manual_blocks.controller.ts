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
import { Roles } from 'src/tools/decorators/roles.decorator';
import { Public } from 'src/tools/decorators/public.decorator';

@Controller('manual-blocks')
export class ManualBlocksController {
    constructor(private readonly service: ManualBlocksService) {}

    @Roles('admin')
    @Post()
    async create(@Body() dto: CreateManualBlockDto) {
        return this.service.createManualBlock(dto);
    }

    @Roles('admin')
    @Post('bulk')
    async createBulk(@Body() dto: CreateBulkManualBlocksDto) {
        return this.service.createBulkManualBlocks(dto);
    }

    @Public()
    @Get(':block_id')
    async findById(@Param('block_id', ParseIntPipe) block_id: number) {
        return this.service.findById(block_id);
    }

    @Public()
    @Get('manual/:manual_id')
    async findByManualId(@Param('manual_id', ParseIntPipe) manual_id: number) {
        return this.service.findByManualId(manual_id);
    }

    @Roles('admin')
    @Put(':block_id')
    async update(
        @Param('block_id', ParseIntPipe) block_id: number,
        @Body() dto: any,
    ) {
        return this.service.updateManualBlock(block_id, dto);
    }

    @Roles('admin')
    @Delete(':block_id')
    async delete(@Param('block_id', ParseIntPipe) block_id: number) {
        return this.service.deleteManualBlock(block_id);
    }

}
