import { CreateBulkManualBlocksDto, CreateManualBlockDto, UpdateManualBlockDto } from "../dtos/manual_block.dto";

export enum BlockType {
  TEXT = 'text',
  IMAGE = 'image',
  GIF = 'gif',
  VIDEO = 'video',
}

export interface ManualBlock {
  block_id: number;
  manual_id: number;
  index: number;
  type: BlockType;
  content: string;
}

export interface ManualBlockServiceInterface {
  createManualBlock(dto: CreateManualBlockDto): Promise<ManualBlock>;
  createBulkManualBlocks(dto: CreateBulkManualBlocksDto): Promise<ManualBlock[]>;
  findById(block_id: number): Promise<ManualBlock | null>;
  findByManualId(manual_id: number): Promise<ManualBlock[]>;
  updateManualBlock(block_id: number, dto: UpdateManualBlockDto): Promise<ManualBlock>;
  deleteManualBlock(block_id: number): Promise<void>;
}
