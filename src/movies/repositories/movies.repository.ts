import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieListItemDto } from '../dto/movie-list-item.dto';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie, MovieDocument } from '../schemas/movie.schema';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<MovieDocument> {
    return this.movieModel.create({
      ...createMovieDto,
      genres: createMovieDto.genres ?? [],
      cast: createMovieDto.cast ?? [],
      languages: createMovieDto.languages ?? [],
      directors: createMovieDto.directors ?? [],
      countries: createMovieDto.countries ?? [],
      num_mflix_comments: createMovieDto.num_mflix_comments ?? 0,
    });
  }

  async findAll(page: number, pageSize: number): Promise<MovieListItemDto[]> {
    const skip = (page - 1) * pageSize;

    return this.movieModel
      .find()
      .select('title plot genres poster year rated imdb num_mflix_comments')
      .sort({ title: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean<MovieListItemDto[]>()
      .exec();
  }

  async searchByTitle(
    query: string,
    page: number,
    pageSize: number,
  ): Promise<MovieListItemDto[]> {
    const skip = (page - 1) * pageSize;

    return this.movieModel
      .find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
      .select('title plot genres poster year rated imdb num_mflix_comments')
      .sort({ score: { $meta: 'textScore' }, title: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean<MovieListItemDto[]>()
      .exec();
  }

  async findById(id: string): Promise<MovieDocument | null> {
    return this.movieModel.findById(id).exec();
  }

  async updateById(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieDocument | null> {
    return this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async deleteById(id: string): Promise<MovieDocument | null> {
    return this.movieModel.findByIdAndDelete(id).exec();
  }
}
