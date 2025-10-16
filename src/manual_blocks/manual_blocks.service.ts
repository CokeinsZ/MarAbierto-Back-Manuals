import { Injectable, NotFoundException } from '@nestjs/common';
import { ManualBlock, ManualBlockServiceInterface } from './interfaces/manual_block.interface';
import { CreateManualBlockDto, CreateBulkManualBlocksDto, UpdateManualBlockDto } from './dtos/manual_block.dto';
import { ManualBlocksRepository } from 'src/databases/repositories/manual_blocks/manual_blocks.repository';

@Injectable()
export class ManualBlocksService implements ManualBlockServiceInterface {
    constructor(private readonly repository: ManualBlocksRepository) {}

    async createManualBlock(dto: CreateManualBlockDto): Promise<ManualBlock> {
        const block = await this.repository.createManualBlock(dto);
        return this.toInterface(block);
    }

    async createBulkManualBlocks(dto: CreateBulkManualBlocksDto): Promise<ManualBlock[]> {
        const blocks = await this.repository.createBulkManualBlocks(dto.manual_id, dto.blocks);
        return blocks.map(this.toInterface);
    }

    async findById(block_id: number): Promise<ManualBlock | null> {
        const block = await this.repository.findById(block_id);
        if (!block)
            throw new NotFoundException('Manual block not found');

        return this.toInterface(block);
    }

    async findByManualId(manual_id: number): Promise<ManualBlock[]> {
        const blocks = await this.repository.findByManualId(manual_id);
        if (!blocks || blocks.length === 0)
            throw new NotFoundException('No manual blocks found for the given manual_id');

        return blocks.map(this.toInterface);
    }

    async updateManualBlock(block_id: number, dto: UpdateManualBlockDto): Promise<ManualBlock> {
        const existingBlock = await this.repository.findById(block_id);
        if (!existingBlock)
            throw new NotFoundException('Manual block not found');

        const block = await this.repository.updateManualBlock(block_id, dto);
        return this.toInterface(block);
    }
    
    async deleteManualBlock(block_id: number): Promise<void> {
        await this.repository.deleteManualBlock(block_id);
    }

    toInterface(manualBlock: any): ManualBlock {
        return {
            block_id: manualBlock.block_id,
            manual_id: manualBlock.manual_id,
            index: manualBlock.index,
            type: manualBlock.type,
            content: manualBlock.content,
        };
    }
}
