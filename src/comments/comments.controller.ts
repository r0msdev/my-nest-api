import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../common/pagination/pagination';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@ApiTags('comments')
@Controller('movies/:movieId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('movieId') movieId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createForMovie(movieId, createCommentDto);
  }

  @Get()
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
    @Param('movieId') movieId: string,
    @Query('page', new DefaultValuePipe(DEFAULT_PAGE), ParseIntPipe)
    page: number,
    @Query('pageSize', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe)
    pageSize: number,
  ) {
    return this.commentsService.findByMovieId(movieId, page, pageSize);
  }
}
