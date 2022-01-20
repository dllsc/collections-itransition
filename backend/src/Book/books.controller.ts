import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from '../dto/create-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LoggedUserService } from '../logged-user.service';

@Controller('books')
export default class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly loggedUserService: LoggedUserService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('post')
  postGenre(@Body() book: CreateBookDto, @Req() request) {
    return this.booksService.insert(book);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.loggedUserService.userId;
    // return this.booksService.getAllBooks();
  }

}
