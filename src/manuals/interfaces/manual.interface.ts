import { CreateManualDto, FilterByDateDto, FilterByTitleDto, FindAllManualsDto, UpdateManualDto } from "../dtos/manual.dto";

export interface Manual {
  manual_id: number;
  title: string;
  thumbnail: string;
  created_at: Date;
  updated_at: Date;
}

export interface ManualServiceInterface {
  createManual(dto: CreateManualDto): Promise<Manual>;
  findAllManuals(dto: FindAllManualsDto): Promise<Manual[]>;
  findById(manual_id: number): Promise<Manual | null>;
  filterByTitle(dto: FilterByTitleDto): Promise<Manual[]>;
  filterByDate(dto: FilterByDateDto): Promise<Manual[]>;
  updateManual(manual_id: number, dto: UpdateManualDto): Promise<Manual | null>;
  deleteManual(manual_id: number): Promise<void>;
}
