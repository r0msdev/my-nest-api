import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from './comments/comments.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        const dbName = configService.get<string>('MONGODB_DB_NAME');

        if (uri === undefined || uri.trim() === '') {
          throw new Error('MONGODB_URI must be defined');
        }

        return {
          uri,
          ...(dbName !== undefined && dbName.trim() !== '' ? { dbName } : {}),
        };
      },
    }),
    MoviesModule,
    CommentsModule,
  ],
})
export class AppModule {}
