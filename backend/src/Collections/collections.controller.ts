import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LoggedUserService } from '../logged-user.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ICollectionEntityDto, ICollectionFormDataJsonDto, ICollectionFormDto } from '../dto/collection.dto';
import ItemsEntity from '../../db/items.entity';
import CollectionsEntity from '../../db/collections.entity';
import * as fs from 'fs';
import { createImageFilename } from '../utils/file.utils';
import { IItemEntityDto } from '../dto/item.dto';
import { IFieldEntityDto } from '../dto/field.dto';
import FieldsEntity from '../../db/fields.entity';
import { createQueryBuilder } from 'typeorm';

const IMG_DIR = './dist/images';

@Controller('collection')
export default class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly loggedUserService: LoggedUserService,
  ) {
  }

  private uploadFile(userId: number, file: Express.Multer.File): string {
    const filename = createImageFilename(userId, file);

    fs.writeFileSync(`${IMG_DIR}/${filename}`, file.buffer);

    return filename;
  }

  private ensureDirectoryExists(): void {
    if (!fs.existsSync(IMG_DIR)) {
      fs.mkdirSync(IMG_DIR, { recursive: true });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async postGenre(
    @Body() collectionFormDataJsonDto: ICollectionFormDataJsonDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    this.ensureDirectoryExists();

    const { userId } = this.loggedUserService;
    const collectionForm: ICollectionFormDto = JSON.parse(collectionFormDataJsonDto.collection);
    const filenames = files.map(file => this.uploadFile(userId, file));
    const collectionDto: ICollectionEntityDto = {
      userId,
      name: collectionForm.name,
      theme: collectionForm.theme,
      description: collectionForm.description,
    };
    const collectionsEntity = CollectionsEntity.fromDto(collectionDto);
    const savedCollectionEntity = await collectionsEntity.save();
    const itemsDto: IItemEntityDto[] = collectionForm.items.map(({ name }, index) => ({
      name,
      image: filenames[index],
      collectionID: savedCollectionEntity.id,
    }));
    const itemEntities = itemsDto.map(ItemsEntity.fromDto);
    const fieldsDto: IFieldEntityDto[] = collectionForm.itemsFields.map(({ name, type, values }) => ({
      name,
      type,
      values,
      collectionId: savedCollectionEntity.id,
    }));
    const fieldEntities = fieldsDto.map(FieldsEntity.fromDto);

    await ItemsEntity.save(itemEntities);
    await FieldsEntity.save(fieldEntities);

    return { id: savedCollectionEntity.id };
  }


  @Get('one/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return createQueryBuilder(CollectionsEntity, 'c')
      .where('c.id = :id')
      .setParameter('id', id)
      .innerJoinAndSelect('c.items', 'items')
      .innerJoinAndSelect('c.fields', 'fields')
      .getOne();
  }

  @Get('page/:page/:limit')
  async getPage(
    @Param('page', ParseIntPipe) page: number,
    @Param('limit', ParseIntPipe) limit: number,
  ): Promise<any> {
    return createQueryBuilder(CollectionsEntity, 'c')
      .skip(page * limit)
      .take(limit)
      .innerJoinAndSelect('c.items', 'items')
      .innerJoinAndSelect('c.fields', 'fields')
      .getMany();
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
