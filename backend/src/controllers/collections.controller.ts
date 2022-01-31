import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import LikeEntity from '../../db/like.entity';

const IMG_DIR = './dist/images';

@Controller('collection')
export default class CollectionsController {
  constructor(
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

  private async createCollectionEntity(
    collectionForm: ICollectionFormDto,
  ): Promise<CollectionsEntity> {
    const collectionDto: ICollectionEntityDto = {
      userId: this.loggedUserService.userId,
      name: collectionForm.name,
      theme: collectionForm.theme,
      description: collectionForm.description,
    };
    const collectionsEntity = CollectionsEntity.fromDto(collectionDto);

    return collectionsEntity.save();
  }

  private async updateCollectionEntity(collectionForm: ICollectionFormDto): Promise<CollectionsEntity> {
    await createQueryBuilder()
      .update(CollectionsEntity, {
        name: collectionForm.name,
        theme: collectionForm.theme,
        description: collectionForm.description,
      })
      .where('id = :id', { id: collectionForm.id })
      .execute();

    return CollectionsEntity.findOne({ where: { id: collectionForm.id } });
  }

  private async deleteRelatedItemsAndFields(collectionId: number) {
    await createQueryBuilder()
      .delete()
      .from(ItemsEntity)
      .where('collectionId = :id', { id: collectionId })
      .execute();

    await createQueryBuilder()
      .delete()
      .from(FieldsEntity)
      .where('collectionId = :id', { id: collectionId })
      .execute();
  }

  private async saveItems(
    collectionId: number,
    collectionForm: ICollectionFormDto,
    files: Express.Multer.File[],
  ) {
    const filenames = files.map((file, index) => file.size
      ? this.uploadFile(this.loggedUserService.userId, file)
      : collectionForm.editCollection.items[index].image,
    );
    const itemsDto: IItemEntityDto[] = collectionForm.items.map(({ name }, index) => ({
      name,
      image: filenames[index],
      collectionId: collectionId,
    }));
    const itemEntities = itemsDto.map(ItemsEntity.fromDto);

    await ItemsEntity.save(itemEntities);
  }

  private async saveFields(
    collectionId: number,
    collectionForm: ICollectionFormDto,
  ) {
    const fieldsDto: IFieldEntityDto[] = collectionForm.itemsFields.map(({ name, type, values }) => ({
      name,
      type,
      values,
      collectionId,
    }));
    const fieldEntities = fieldsDto.map(FieldsEntity.fromDto);

    await FieldsEntity.save(fieldEntities);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() collectionFormDataJsonDto: ICollectionFormDataJsonDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    this.ensureDirectoryExists();

    const collectionForm: ICollectionFormDto = JSON.parse(collectionFormDataJsonDto.collection);

    const savedCollectionEntity = collectionForm.editCollection
      ? await this.updateCollectionEntity(collectionForm)
      : await this.createCollectionEntity(collectionForm);

    if (collectionForm.editCollection) {
      await this.deleteRelatedItemsAndFields(collectionForm.id);
    }

    await this.saveItems(savedCollectionEntity.id, collectionForm, files);
    await this.saveFields(savedCollectionEntity.id, collectionForm);

    return { id: savedCollectionEntity.id };
  }


  @Get('one/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await createQueryBuilder(CollectionsEntity, 'c')
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

  @Get('user/:userId')
  async getCollectionsByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return createQueryBuilder(CollectionsEntity, 'c')
      .where('userId = :userId', { userId })
      .innerJoinAndSelect('c.items', 'items')
      .innerJoinAndSelect('c.fields', 'fields')
      .getMany();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyCollections() {
    return this.getCollectionsByUser(this.loggedUserService.userId);
  }

  @Get('liked/:page/:limit')
  @UseGuards(JwtAuthGuard)
  async getLikedCollections(@Param('page', ParseIntPipe) page: number,
                            @Param('limit', ParseIntPipe) limit: number) {
    const likesWithCollections = await createQueryBuilder(LikeEntity, 'l')
      .where('l.userId = :userId', { userId: this.loggedUserService.userId })
      .skip(page * limit)
      .take(limit)
      .innerJoinAndSelect('l.collection', 'collection')
      .leftJoinAndSelect('collection.items', 'items')
      .leftJoinAndSelect('collection.fields', 'fields')
      .getMany()
    ;

    return likesWithCollections.map(like => like.collection);
  }
}
