
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import BooksController from './books.controller';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BooksService],
})
export default class BooksModule {}
