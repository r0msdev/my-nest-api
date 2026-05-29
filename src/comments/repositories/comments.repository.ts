import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment, CommentDocument } from '../schemas/comment.schema';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async createForMovie(
    movieId: Types.ObjectId,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentDocument> {
    return this.commentModel.create({
      movie_id: movieId,
      ...createCommentDto,
    });
  }

  async findByMovieId(
    movieId: Types.ObjectId,
    page: number,
    pageSize: number,
  ): Promise<CommentDocument[]> {
    const skip = (page - 1) * pageSize;

    return this.commentModel
      .find({ movie_id: movieId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(pageSize)
      .exec();
  }
}
