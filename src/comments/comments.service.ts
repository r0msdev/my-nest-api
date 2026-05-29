import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { validatePagination } from '../common/pagination/pagination';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './repositories/comments.repository';
import { CommentDocument } from './schemas/comment.schema';
import { MoviesRepository } from '../movies/repositories/movies.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async createForMovie(
    movieId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentDocument> {
    const objectId = this.toObjectId(movieId);

    return this.commentsRepository.createForMovie(objectId, createCommentDto);
  }

  async findByMovieId(
    movieId: string,
    page: number,
    pageSize: number,
  ): Promise<CommentDocument[]> {
    validatePagination(page, pageSize);

    const objectId = this.toObjectId(movieId);

    return this.commentsRepository.findByMovieId(objectId, page, pageSize);
  }

  private toObjectId(movieId: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(movieId)) {
      throw new BadRequestException(
        `Movie id ${movieId} is not a valid ObjectId`,
      );
    }

    return new Types.ObjectId(movieId);
  }
}
