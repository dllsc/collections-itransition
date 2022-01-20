import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FieldService } from './field.service';
import CreateBookDto from '../dto/create-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LoggedUserService } from '../logged-user.service';
import CreateCollectionDto from '../dto/create-collection.dto';

@Controller('collections')
export default class FieldController {
  constructor(
    private readonly collectionsService: FieldService,
    private readonly loggedUserService: LoggedUserService,
  ) {
  }
  //
  // @UseGuards(JwtAuthGuard)
  // @Post('post')
  // postGenre(@Body() collection: CreateCollectionDto, @Req() request) {
  //   collection.userID = this.loggedUserService.userId;
  //   return this.collectionsService.insert(collection);
  // }
  //
  // @Get()
  // @UseGuards(JwtAuthGuard)
  // getAll(@Req() request) {
  //   const userID = this.loggedUserService.userId;
  //   return this.collectionsService.getAllCollection(userID);
  // }

}
