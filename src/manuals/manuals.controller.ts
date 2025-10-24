import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CheckPolicies } from 'src/tools/decorators/check-policies.decorator';
import { Action } from 'src/tools/abilities/ability.factory';
import { ManualsService } from './manuals.service';
import { CreateManualDto, FilterByDateDto, FilterByTitleDto, FindAllManualsDto, UpdateManualDto } from './dtos/manual.dto';

@Controller('manuals')
@CheckPolicies({ action: Action.Manage, subject: 'Manual' })
export class ManualsController {
    constructor(private readonly service: ManualsService) {}

    @Post()
    async create(@Body() dto: CreateManualDto) {
        return this.service.createManual(dto);
    }

    @Get()
    async findAll(@Query() dto: FindAllManualsDto) {
        return this.service.findAllManuals(dto);
    }

    @Get('filter/title')
    async filterByTitle(@Query() dto: FilterByTitleDto) {
        return this.service.filterByTitle(dto);
    }

    @Get('filter/date')
    async filterByDate(@Query() dto: FilterByDateDto) {
        return this.service.filterByDate(dto);
    }

    @Get(':manual_id')
    async findById(@Param('manual_id', ParseIntPipe) manual_id: number) {
        return this.service.findById(manual_id);
    }

    @Put(':manual_id')
    async update(
        @Param('manual_id', ParseIntPipe) manual_id: number,
        @Body() dto: UpdateManualDto,
    ) {
        return this.service.updateManual(manual_id, dto);
    }

    @Delete(':manual_id')
    async delete(@Param('manual_id', ParseIntPipe) manual_id: number) {
        return this.service.deleteManual(manual_id);
    }
}
