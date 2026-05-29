import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovieListItemDto {
  @ApiProperty({ description: 'Movie id', example: '573a1390f29313caabcd42e8' })
  _id: string;

  @ApiProperty({
    description: 'Movie title',
    example: 'The Great Train Robbery',
  })
  title: string;

  @ApiPropertyOptional({
    description: 'Short plot summary',
    example: 'A group of bandits stage a brazen train hold-up.',
  })
  plot?: string;

  @ApiPropertyOptional({ type: [String], example: ['Short', 'Western'] })
  genres?: string[];

  @ApiPropertyOptional({
    description: 'Poster URL',
    example: 'https://m.media-amazon.com/images/M/...',
  })
  poster?: string;

  @ApiPropertyOptional({ description: 'Release year', example: 1903 })
  year?: number;

  @ApiPropertyOptional({ description: 'Content rating', example: 'TV-G' })
  rated?: string;

  @ApiPropertyOptional({ description: 'IMDb rating', example: 7.4 })
  imdbRating?: number;

  @ApiProperty({ description: 'Number of comments', example: 0 })
  num_mflix_comments: number;
}
