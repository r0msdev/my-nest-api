import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({
  versionKey: false,
})
export class Movie {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  plot?: string;

  @Prop({ trim: true })
  fullplot?: string;

  @Prop({ type: [String], default: [] })
  genres: string[];

  @Prop({ type: [String], default: [] })
  cast: string[];

  @Prop({ min: 1 })
  runtime?: number;

  @Prop({ trim: true })
  poster?: string;

  @Prop({ type: [String], default: [] })
  languages: string[];

  @Prop({ type: Date })
  released?: Date;

  @Prop({ type: [String], default: [] })
  directors: string[];

  @Prop({ trim: true })
  rated?: string;

  @Prop(
    raw({
      wins: { type: Number, min: 0 },
      nominations: { type: Number, min: 0 },
      text: { type: String },
    }),
  )
  awards?: {
    wins?: number;
    nominations?: number;
    text?: string;
  };

  @Prop({ trim: true })
  lastupdated?: string;

  @Prop({ min: 1888 })
  year?: number;

  @Prop(
    raw({
      rating: { type: Number, min: 0, max: 10 },
      votes: { type: Number, min: 0 },
      id: { type: Number, min: 0 },
    }),
  )
  imdb?: {
    rating?: number;
    votes?: number;
    id?: number;
  };

  @Prop({ type: [String], default: [] })
  countries: string[];

  @Prop({ trim: true })
  type?: string;

  @Prop(
    raw({
      viewer: {
        rating: { type: Number, min: 0, max: 10 },
        numReviews: { type: Number, min: 0 },
        meter: { type: Number, min: 0, max: 100 },
      },
      fresh: { type: Number, min: 0 },
      critic: {
        rating: { type: Number, min: 0, max: 10 },
        numReviews: { type: Number, min: 0 },
        meter: { type: Number, min: 0, max: 100 },
      },
      rotten: { type: Number, min: 0 },
      lastUpdated: { type: Date },
    }),
  )
  tomatoes?: {
    viewer?: {
      rating?: number;
      numReviews?: number;
      meter?: number;
    };
    fresh?: number;
    critic?: {
      rating?: number;
      numReviews?: number;
      meter?: number;
    };
    rotten?: number;
    lastUpdated?: Date;
  };

  @Prop({ min: 0, default: 0 })
  num_mflix_comments: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

MovieSchema.index({ title: 1 });
MovieSchema.index({ year: 1 });
