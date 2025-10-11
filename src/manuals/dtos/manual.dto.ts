import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateManualDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  thumbnail: string;
}

export class FindAllManualsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;
}

export class FilterByTitleDto {
  @IsOptional()
  @IsString()
  @MaxLength(32)
  title?: string;
}

export class FilterByDateDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1900)
  @Max(2100)
  year?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(12)
  month?: number;
}

export class UpdateManualDto {
  @IsOptional()
  @IsString()
  @MaxLength(32)
  title?: string;
  
  @IsOptional()
  @IsString()
  @MaxLength(255)
  thumbnail?: string;
}