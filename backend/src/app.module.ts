import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../db/user.entity';
import { LoggedUserService } from './logged-user.service';
import CollectionsEntity from '../db/collections.entity';
import ItemsEntity from '../db/items.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import LikeEntity from '../db/like.entity';
import CollectionsController from './controllers/collections.controller';
import { LikesController } from './controllers/likes.controller';


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

console.log(__dirname);

@Module({
  controllers: [
    CollectionsController,
    LikesController,
  ],
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'my_db.db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(
      [UserEntity, CollectionsEntity, ItemsEntity, LikeEntity],
    ),
    ServeStaticModule.forRoot({
      rootPath: process.env.NODE_ENV?.trim() === 'production'
        ? `${__dirname}/static/`
        : `${__dirname}/../../dev-static`,
    }),
    GlobalModule,
  ],
})
export class AppModule {
}

