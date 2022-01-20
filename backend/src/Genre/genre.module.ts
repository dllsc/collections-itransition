
import { Module } from '@nestjs/common';
import GenreServices from './genre.services';
import GenreController from './genre.controller';
@Module({
  imports: [],
  controllers: [GenreController],
  providers: [GenreServices],
})
export default class GenreModule {}
