import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { Manual } from '../../../manuals/interfaces/manual.interface';

@Injectable()
export class ManualsRepository {
  constructor(private readonly db: DatabaseService) {}

  async createManual(manual: Partial<Manual>): Promise<Manual> {
    const rows = await this.db.query<Manual>`
      INSERT INTO manuals (title, thumbnail)
      VALUES (${manual.title}, ${manual.thumbnail})
      RETURNING *`;
    return rows[0];
  }

  async findAllManuals(max: number, page: number): Promise<Manual[]> {
    const rows = await this.db.query<Manual>`
      SELECT * FROM manuals
      ORDER BY created_at DESC
      LIMIT ${max} OFFSET ${page * max}`;
    return rows;
  }

  async findById(manual_id: number): Promise<Manual | null> {
    const rows = await this.db.query<Manual>`
      SELECT * FROM manuals
      WHERE manual_id = ${manual_id}`;
    return rows[0] || null;
  }

  async filterByTitle(title: string): Promise<Manual[]> {
    const rows = await this.db.query<Manual>`
      SELECT * FROM manuals
      WHERE unaccent(title) ILIKE '%' || unaccent(${title}) || '%'
      ORDER BY created_at DESC`;
    return rows;
  }

  async filterByDate(year: number, month: number): Promise<Manual[]> {
    const rows = await this.db.query<Manual>`
      SELECT * FROM manuals
      WHERE EXTRACT(YEAR FROM updated_at) = ${year}
      AND EXTRACT(MONTH FROM updated_at) = ${month}
      ORDER BY updated_at DESC`;
    return rows;
  }

  async updateManual(manual_id: number, manual: Partial<Manual>): Promise<Manual | null> {
    const keys = Object.keys(manual).filter((k) => k !== 'manual_id');
    if (keys.length === 0) {
      throw new BadRequestException(
        "No fields to update. (You can't update the id)",
      );
    }
    const setClauses: string[] = [];
    const values: any[] = [];
    keys.forEach((k, idx) => {
      setClauses.push(`${k} = $${idx + 1}`);
      values.push((manual as any)[k]);
    });
    // WHERE param position is next
    const whereIndex = values.length + 1;
    const sql = `UPDATE manuals SET ${setClauses.join(', ')} WHERE manual_id = $${whereIndex} RETURNING *`;
    values.push(manual_id);
    const rows = await this.db.unsafe<Manual>(sql, values);
    return rows[0];
  }

  async deleteManual(manual_id: number): Promise<void> {
    await this.db.query`
      DELETE FROM manuals
      WHERE manual_id = ${manual_id}`;
  }
}
