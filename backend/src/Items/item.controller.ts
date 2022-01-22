import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ICreateItemDto } from '../dto/create-item.dto';

@Controller('items')
export default class ItemController {
  constructor(
    private readonly itemService: ItemService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('post')

  createItem(
    @Body() createItemDto: ICreateItemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
  }

  @Get(':collectionId')
  @UseGuards(JwtAuthGuard)
  getAll(@Param('collectionId') collectionId: string) {
    console.log(collectionId);
    return this.itemService.getAllItems(collectionId);
  }

}
