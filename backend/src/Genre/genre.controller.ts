import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import GenreServices from './genre.services';
import CreateGenreDto from '../dto/create-genre.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreServices) {}
  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
    console.log('123');
    return this.genreServices.insert(genre);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.genreServices.getAllGenre();
  }
}
