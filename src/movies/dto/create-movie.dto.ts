import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  plot?: string;

  @IsOptional()
  @IsString()
  fullplot?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  cast?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  runtime?: number;

  @IsOptional()
  @IsUrl()
  poster?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  languages?: string[];

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  released?: Date;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  directors?: string[];

  @IsOptional()
  @IsString()
  rated?: string;

  @IsOptional()
  @IsObject()
  awards?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  lastupdated?: string;

  @IsOptional()
  @IsInt()
  @Min(1888)
  @Max(3000)
  year?: number;

  @IsOptional()
  @IsObject()
  imdb?: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  countries?: string[];

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsObject()
  tomatoes?: Record<string, unknown>;

  @IsOptional()
  @IsInt()
  @Min(0)
  num_mflix_comments?: number;
}
