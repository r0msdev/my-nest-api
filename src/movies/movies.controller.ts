import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../common/pagination/pagination';
import { MovieListItemDto } from './dto/movie-list-item.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOkResponse({ type: [MovieListItemDto] })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: DEFAULT_PAGE,
    description: '1-based page number',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    example: DEFAULT_PAGE_SIZE,
    description: 'Number of records per page',
  })
  findAll(
    @Query('page', new DefaultValuePipe(DEFAULT_PAGE), ParseIntPipe)
    page: number,
    @Query('pageSize', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe)
    pageSize: number,
  ) {
    return this.moviesService.findAll(page, pageSize);
  }

  @Get('search')
  @ApiOkResponse({ type: [MovieListItemDto] })
  @ApiQuery({
    name: 'q',
    required: true,
    type: String,
    description: 'Full-text search query (searches title, cast, genres, plot)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: DEFAULT_PAGE,
    description: '1-based page number',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    example: DEFAULT_PAGE_SIZE,
    description: 'Number of records per page',
  })
  search(
    @Query('q') query: string,
    @Query('page', new DefaultValuePipe(DEFAULT_PAGE), ParseIntPipe)
    page: number,
    @Query('pageSize', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe)
    pageSize: number,
  ) {
    return this.moviesService.search(query, page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
