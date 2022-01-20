import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import {ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

//
import UserEntity from '../db/user.entity';
import BooksModule from 'src/Book/books.module';
import GenreModule from 'src/Genre/genre.module';
import BookEntity from '../db/book.entity';
import GenreEntity from '../db/genre.entity';
import { LoggedUserService } from './logged-user.service';
import CollectionsModule from './Collections/collections.module';
import CollectionsEntity from '../db/collections.entity';
import ItemModule from './Items/item.module';
import ItemsEntity from '../db/items.entity';
import { ServeStaticModule } from '@nestjs/serve-static';


@Global()
@Module({
  providers: [
    LoggedUserService,
  ],
  exports: [
    LoggedUserService,
  ],
})
export class GlobalModule {

}

@Module({
  imports: [
    // ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'my_db.db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(
      [UserEntity, BookEntity, GenreEntity, CollectionsEntity, ItemsEntity],
    ),
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../images`,
    }),
    BooksModule,
    GenreModule,
    GlobalModule,
    CollectionsModule,
    ItemModule,
  ],
})
export class AppModule {
}
