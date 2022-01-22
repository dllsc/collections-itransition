import { Controller } from '@nestjs/common';
import { FieldService } from './field.service';
import { LoggedUserService } from '../logged-user.service';

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
