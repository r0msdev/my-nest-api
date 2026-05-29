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
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../common/pagination/pagination';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

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
