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
import { Roles } from 'src/tools/decorators/roles.decorator';
import { Public } from 'src/tools/decorators/public.decorator';

@Controller('manuals')
export class ManualsController {
    constructor(private readonly service: ManualsService) {}

    @Roles('admin')
    @Post()
    async create(@Body() dto: CreateManualDto) {
        return this.service.createManual(dto);
    }

    @Public()
    @Get()
    async findAll(@Query() dto: FindAllManualsDto) {
        return this.service.findAllManuals(dto);
    }

    @Public()
    @Get('filter/title')
    async filterByTitle(@Query() dto: FilterByTitleDto) {
        return this.service.filterByTitle(dto);
    }

    @Public()
    @Get('filter/date')
    async filterByDate(@Query() dto: FilterByDateDto) {
        return this.service.filterByDate(dto);
    }

    @Public()
    @Get(':manual_id')
    async findById(@Param('manual_id', ParseIntPipe) manual_id: number) {
        return this.service.findById(manual_id);
    }

    @Roles('admin')
    @Put(':manual_id')
    async update(
        @Param('manual_id', ParseIntPipe) manual_id: number,
        @Body() dto: UpdateManualDto,
    ) {
        return this.service.updateManual(manual_id, dto);
    }

    @Roles('admin')
    @Delete(':manual_id')
    async delete(@Param('manual_id', ParseIntPipe) manual_id: number) {
        return this.service.deleteManual(manual_id);
    }
}
