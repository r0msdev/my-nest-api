import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsRepository } from '../comments/repositories/comments.repository';
import { Types } from 'mongoose';
import { validatePagination } from '../common/pagination/pagination';
import { MovieListItemDto } from './dto/movie-list-item.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repositories/movies.repository';
import { MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  create(createMovieDto: CreateMovieDto): Promise<MovieDocument> {
    return this.moviesRepository.create(createMovieDto);
  }

  findAll(page: number, pageSize: number): Promise<MovieListItemDto[]> {
    validatePagination(page, pageSize);

    return this.moviesRepository.findAll(page, pageSize);
  }

  async findById(id: string): Promise<MovieDocument> {
    this.ensureValidObjectId(id);

    const movie = await this.moviesRepository.findById(id);

    if (movie === null) {
      throw new NotFoundException(`Movie ${id} was not found`);
    }

    return movie;
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieDocument> {
    this.ensureValidObjectId(id);

    const movie = await this.moviesRepository.updateById(id, updateMovieDto);

    if (movie === null) {
      throw new NotFoundException(`Movie ${id} was not found`);
    }

    return movie;
  }

  async remove(id: string): Promise<MovieDocument> {
    this.ensureValidObjectId(id);

    const movie = await this.moviesRepository.deleteById(id);

    if (movie === null) {
      throw new NotFoundException(`Movie ${id} was not found`);
    }

    await this.commentsRepository.deleteByMovieId(new Types.ObjectId(id));

    return movie;
  }

  private ensureValidObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Movie id ${id} is not a valid ObjectId`);
    }
  }
}
