import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import UserEntity from './user.entity';
import ItemsEntity from './items.entity';
import { ICollectionEntityDto } from '../src/dto/collection.dto';
import FieldsEntity from './fields.entity';
import { createIdModel } from '../src/utils/database.utils';

@Entity()
export default class CollectionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 500 })
  theme: string;

  @ManyToOne(() => UserEntity, user => user.collections)
  user: UserEntity;

  @OneToMany(() => ItemsEntity, item => item.collection)
  items: ItemsEntity[];

  @OneToMany(() => FieldsEntity, field => field.collection)
  fields: FieldsEntity[];

  userId: number;

  static fromDto(dto: ICollectionEntityDto): CollectionsEntity {
    const collection = new CollectionsEntity();

    collection.name = dto.name;
    collection.theme = dto.theme;
    collection.user = createIdModel<UserEntity>({ id: dto.userId });
    collection.description = dto.description;

    return collection;
  }
}
