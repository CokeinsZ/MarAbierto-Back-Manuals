import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { ManualBlock } from 'src/manual_blocks/interfaces/manual_block.interface';

@Injectable()
export class ManualBlocksRepository {
  constructor(private readonly db: DatabaseService) {}

  async createManualBlock(manualBlock: Partial<ManualBlock>): Promise<ManualBlock> {
    const rows = await this.db.query<ManualBlock>`
      INSERT INTO manualblocks (manual_id, index, type, content)
      VALUES (${manualBlock.manual_id}, ${manualBlock.index}, ${manualBlock.type}, ${manualBlock.content})
      RETURNING *`;
    return rows[0];
  }

  async createBulkManualBlocks(manual_id: number, blocks: Partial<ManualBlock>[]): Promise<ManualBlock[]> {
    const valuePlaceholders = blocks.map((_, idx) => {
      const baseIndex = idx * 3; // Cada bloque tiene 3 parámetros (index, type, content)
      return `($1, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4})`;
    }).join(', ');

    const params = [
      manual_id,
      ...blocks.flatMap(block => [block.index, block.type, block.content])
    ];

    const query = `
      INSERT INTO manualblocks (manual_id, index, type, content)
      VALUES ${valuePlaceholders}
      RETURNING *`;

    const rows = await this.db.unsafe<ManualBlock>(query, params);
    
    return rows;
  }

  async findById(block_id: number): Promise<ManualBlock | null> {
    const rows = await this.db.query<ManualBlock>`
      SELECT * FROM manualblocks WHERE block_id = ${block_id}`;
    return rows[0] || null;
  }

  async findByManualId(manual_id: number): Promise<ManualBlock[]> {
    const rows = await this.db.query<ManualBlock>`
      SELECT * FROM manualblocks WHERE manual_id = ${manual_id}`;
    return rows;
  }

  async updateManualBlock(block_id: number, manual_block: Partial<ManualBlock>): Promise<ManualBlock> {
    const keys = Object.keys(manual_block).filter((k) => k !== 'block_id');
    if (keys.length === 0) {
      throw new BadRequestException(
        "No fields to update. (You can't update the id)",
      );
    }
    const setClauses: string[] = [];
    const values: any[] = [];
    keys.forEach((k, idx) => {
      setClauses.push(`${k} = $${idx + 1}`);
      values.push((manual_block as any)[k]);
    });
    // updated_at at end
    setClauses.push(`updated_at = NOW()`);
    // WHERE param position is next
    const whereIndex = values.length + 1;
    const sql = `UPDATE manualblocks SET ${setClauses.join(', ')} WHERE block_id = $${whereIndex} RETURNING *`;
    values.push(block_id);
    const rows = await this.db.unsafe<ManualBlock>(sql, values);
    return rows[0];
  }

  async deleteManualBlock(block_id: number): Promise<void> {
    await this.db.query`
      DELETE FROM manualblocks WHERE block_id = ${block_id}`;
  }

}
