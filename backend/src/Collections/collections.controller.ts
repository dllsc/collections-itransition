import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import CreateBookDto from '../dto/create-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LoggedUserService } from '../logged-user.service';
import CreateCollectionDto from '../dto/create-collection.dto';

@Controller('collections')
export default class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly loggedUserService: LoggedUserService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('post')
  postGenre(@Body() collection: CreateCollectionDto, @Req() request) {
    collection.userID = this.loggedUserService.userId;
    return this.collectionsService.insert(collection);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Req() request) {
    const userID = this.loggedUserService.userId;
    return this.collectionsService.getAllCollection(userID);
  }

  @Get(':collectionID')
  @UseGuards(JwtAuthGuard)
  getCollection(@Param('collectionID') collectionId: string) {
    return this.collectionsService.getCollection(collectionId);
  }

}
