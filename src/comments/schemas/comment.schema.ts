import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Movie } from '../../movies/schemas/movie.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
  versionKey: false,
})
export class Comment {
  @Prop({ type: Types.ObjectId, ref: Movie.name, required: true, index: true })
  movie_id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, trim: true })
  text: string;

  @Prop({ type: Date, default: Date.now, required: true })
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.index({ movie_id: 1, date: -1 });
