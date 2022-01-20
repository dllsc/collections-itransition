// import BookEntity from '../db/entity/book.entity';
// import CreateBookDto from './dto/create-book.dto';
// import UserEntity from '../db/entity/user.entity';
// import { createQueryBuilder, getConnection } from 'typeorm';
// import GenreEntity from '../db/entity/genre.entity';

import CreateBookDto from '../dto/create-book.dto';
import BookEntity from '../../db/book.entity';
import UserEntity from '../../db/user.entity';
import GenreEntity from '../../db/genre.entity';

export class BooksService {

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name, email, genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(email);
    book.genres = [];
    for (let i = 0; i < genreIDs.length; i++) {
      const genre = await GenreEntity.findOne(genreIDs[i]);
      book.genres.push(genre);
    }
    await book.save();
    return book;
  }

  async getAllBooks(): Promise<BookEntity[]> {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return BookEntity.find();
  }
}
