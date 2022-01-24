import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import {ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

//
import UserEntity from '../db/user.entity';
import { LoggedUserService } from './logged-user.service';
import CollectionsModule from './Collections/collections.module';
import CollectionsEntity from '../db/collections.entity';
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
      // logging: ['query'],
    }),
    TypeOrmModule.forFeature(
      [UserEntity, CollectionsEntity, ItemsEntity],
    ),
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../images`,
    }),
    GlobalModule,
    CollectionsModule,
  ],
})
export class AppModule {
}

