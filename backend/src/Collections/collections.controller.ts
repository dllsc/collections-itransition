import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LoggedUserService } from '../logged-user.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ICollectionDto, ICollectionFormDataJsonDto, ICollectionFormDto } from '../dto/create-collection.dto';
import ItemsEntity from '../../db/items.entity';
import CollectionsEntity from '../../db/collections.entity';
import * as fs from 'fs';
import { createImageFilename } from '../utils/file.utils';
import { IItemDto } from '../dto/create-item.dto';
import { IFieldDto } from '../dto/field.dto';
import FieldsEntity from '../../db/fields.entity';

const IMG_DIR = './dist/images';


// localhost:3000/collection/one/1
// localhost:3000/collection/page/0/10


// collection/view/1 -> page of collection(collection/item)

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
    if (!fs.existsSync(IMG_DIR)){
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
    const collectionDto: ICollectionDto = {
      userId,
      name: collectionForm.name,
      theme: collectionForm.theme,
      description: collectionForm.description,
    };
    const collectionsEntity = CollectionsEntity.fromDto(collectionDto);
    const savedCollectionEntity = await collectionsEntity.save();
    const itemsDto: IItemDto[] = collectionForm.items.map(({ name }, index) => ({
      name,
      image: filenames[index],
      collectionID: savedCollectionEntity.id,
    }));
    const itemEntities = itemsDto.map(ItemsEntity.fromDto);
    const savedItemEntities = await ItemsEntity.save(itemEntities);
    const fieldsDto: IFieldDto[] = collectionForm.itemsFields.map(({ name, type, values }) => ({
      name,
      type,
      values,
      collectionId: savedCollectionEntity.id,
    }));
    const fieldEntities = fieldsDto.map(FieldsEntity.fromDto);
    const savedFieldEntities = await FieldsEntity.save(fieldEntities);

    return { id: savedCollectionEntity.id };
  }


  Get('one/:id')
  getOne() {

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
