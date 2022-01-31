import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import {ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

//
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

@Module({
  controllers: [
    CollectionsController,
    LikesController,
  ],
  imports: [
    // ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'my_db.db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      // logging: ['query'],
    }),
    TypeOrmModule.forFeature(
      [UserEntity, CollectionsEntity, ItemsEntity, LikeEntity],
    ),
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../images`,
    }),
    GlobalModule,
  ],
})
export class AppModule {
}

