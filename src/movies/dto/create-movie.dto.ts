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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'The Great Train Robbery',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Short plot summary',
    example:
      'A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.',
  })
  @IsOptional()
  @IsString()
  plot?: string;

  @ApiPropertyOptional({
    description: 'Detailed plot summary',
    example:
      'Among the earliest existing films in American cinema, it depicts cowboy outlaws who hold up a train and rob passengers.',
  })
  @IsOptional()
  @IsString()
  fullplot?: string;

  @ApiPropertyOptional({
    description: 'Movie genres',
    type: [String],
    example: ['Short', 'Western'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  genres?: string[];

  @ApiPropertyOptional({
    description: 'Cast members',
    type: [String],
    example: ['A.C. Abadie', "Gilbert M. 'Broncho Billy' Anderson"],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  cast?: string[];

  @ApiPropertyOptional({
    description: 'Movie runtime in minutes',
    example: 11,
    minimum: 1,
    maximum: 1000,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  runtime?: number;

  @ApiPropertyOptional({
    description: 'Poster URL',
    example:
      'https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg',
  })
  @IsOptional()
  @IsUrl()
  poster?: string;

  @ApiPropertyOptional({
    description: 'Spoken languages',
    type: [String],
    example: ['English'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional({
    description: 'Release date',
    type: String,
    format: 'date-time',
    example: '1903-12-01T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  released?: Date;

  @ApiPropertyOptional({
    description: 'Directors',
    type: [String],
    example: ['Edwin S. Porter'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  directors?: string[];

  @ApiPropertyOptional({
    description: 'Content rating',
    example: 'TV-G',
  })
  @IsOptional()
  @IsString()
  rated?: string;

  @ApiPropertyOptional({
    description: 'Awards summary object',
    type: Object,
    example: { wins: 1, nominations: 0, text: '1 win.' },
  })
  @IsOptional()
  @IsObject()
  awards?: Record<string, unknown>;

  @ApiPropertyOptional({
    description: 'Last update string from source dataset',
    example: '2015-08-13 00:27:59.177000000',
  })
  @IsOptional()
  @IsString()
  lastupdated?: string;

  @ApiPropertyOptional({
    description: 'Release year',
    example: 1903,
    minimum: 1888,
    maximum: 3000,
  })
  @IsOptional()
  @IsInt()
  @Min(1888)
  @Max(3000)
  year?: number;

  @ApiPropertyOptional({
    description: 'IMDb data object',
    type: Object,
    example: { rating: 7.4, votes: 9847, id: 439 },
  })
  @IsOptional()
  @IsObject()
  imdb?: Record<string, unknown>;

  @ApiPropertyOptional({
    description: 'Countries of origin',
    type: [String],
    example: ['USA'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  countries?: string[];

  @ApiPropertyOptional({
    description: 'Media type',
    example: 'movie',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description: 'Rotten Tomatoes data object',
    type: Object,
  })
  @IsOptional()
  @IsObject()
  tomatoes?: Record<string, unknown>;

  @ApiPropertyOptional({
    description: 'Number of comments associated with this movie',
    example: 0,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  num_mflix_comments?: number;
}
