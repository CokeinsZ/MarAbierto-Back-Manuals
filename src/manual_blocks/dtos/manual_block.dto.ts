import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BlockType } from '../interfaces/manual_block.interface';

export class ManualBlockItemDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  index: number;

  @IsNotEmpty()
  @IsEnum(BlockType, { message: 'type must be one of: text, image, gif, video' })
  type: BlockType;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class CreateManualBlockDto extends ManualBlockItemDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  manual_id: number;
}

// DTO para crear múltiples bloques con un solo manual_id
export class CreateBulkManualBlocksDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  manual_id: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ManualBlockItemDto)
  blocks: ManualBlockItemDto[];
}

export class UpdateManualBlockDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  index?: number;

  @IsOptional()
  @IsEnum(BlockType, { message: 'type must be one of: text, image, gif, video' })
  type?: BlockType;

  @IsOptional()
  @IsString()
  content?: string;
}
