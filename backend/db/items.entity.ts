import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import CollectionsEntity from './collections.entity';
import FieldsEntity from './fields.entity';
import { IItemEntityDto } from '../src/dto/item.dto';
import { createIdModel } from '../src/utils/database.utils';

@Entity()
export default class ItemsEntity extends BaseEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  image: string;

  collectionId: number;

  @ManyToOne(() => CollectionsEntity, collection => collection.items, {
    nullable: false,
    createForeignKeyConstraints: true,
  })
  collection: CollectionsEntity;

  static fromDto(dto: IItemEntityDto): ItemsEntity {
    const item = new ItemsEntity();

    item.name = dto.name;
    item.image = dto.image;

    item.collection = createIdModel<CollectionsEntity>({ id: dto.collectionID });

    return item;
  }

}
