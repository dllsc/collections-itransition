import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LoggedUserService } from '../logged-user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { CreateItemDto, ItemDto } from '../dto/create-item.dto';

@Controller('items')
export default class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly loggedUserService: LoggedUserService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('post')
  @UseInterceptors(FileInterceptor('image'))
  postGenre(
    @Body() createItemDto: CreateItemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // TODO: add case for production build
    fs.writeFileSync(`./dist/images/${file.originalname}`, file.buffer);

    const itemDto: ItemDto = {
      ...createItemDto,
      image: file.originalname,
    };
    console.log(itemDto);

    return this.itemService.insert(itemDto);
  }

  @Get(':collectionId')
  @UseGuards(JwtAuthGuard)
  getAll(@Param('collectionId') collectionId: string) {
    console.log(collectionId);
    return this.itemService.getAllItems(collectionId);
  }

}
