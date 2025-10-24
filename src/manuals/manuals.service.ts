import { Injectable, NotFoundException } from '@nestjs/common';
import { Manual, ManualServiceInterface } from './interfaces/manual.interface';
import { CreateManualDto, FilterByDateDto, FilterByTitleDto, FindAllManualsDto, UpdateManualDto } from './dtos/manual.dto';
import { ManualsRepository } from 'src/databases/repositories/manuals/manuals.repository';

@Injectable()
export class ManualsService implements ManualServiceInterface {
    constructor(private readonly repository: ManualsRepository) {}

    async createManual(dto: CreateManualDto): Promise<Manual> {
        const manual = await this.repository.createManual(dto);
        return this.toInterface(manual);
    }

    async findAllManuals(dto: FindAllManualsDto): Promise<Manual[]> {
        const limit = dto.limit || 10;
        const page = (dto.page || 1) - 1;
        const manuals = await this.repository.findAllManuals(limit, page);
        return manuals.map(this.toInterface);
    }

    async findById(manual_id: number): Promise<Manual | null> {
        const manual = await this.repository.findById(manual_id);
        if (!manual)
            throw new NotFoundException('Manual not found');

        return this.toInterface(manual);
    }

    async filterByTitle(dto: FilterByTitleDto): Promise<Manual[]> {
        if (!dto.title) {
            return [];
        }
        const manuals = await this.repository.filterByTitle(dto.title);
        return manuals.map(this.toInterface);
    }

    async filterByDate(dto: FilterByDateDto): Promise<Manual[]> {
        if (!dto.year || !dto.month) {
            return [];
        }
        const manuals = await this.repository.filterByDate(dto.year, dto.month);
        return manuals.map(this.toInterface);
    }

    async updateManual(manual_id: number, dto: UpdateManualDto): Promise<Manual | null> {
        const existingManual = await this.repository.findById(manual_id);
        if (!existingManual)
            throw new NotFoundException('Manual not found');

        const manual = await this.repository.updateManual(manual_id, dto);
        return this.toInterface(manual);
    }
    
    async deleteManual(manual_id: number): Promise<void> {
        await this.repository.deleteManual(manual_id);
    }

    toInterface(manual: any): Manual {
        return {
            manual_id: manual.manual_id,
            title: manual.title,
            thumbnail: manual.thumbnail,
            created_at: manual.created_at,
            updated_at: manual.updated_at,
        };
    }
}
