import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import ItemsEntity from './items.entity';
import { IFieldEntityDto } from '../src/dto/field.dto';
import CollectionsEntity from './collections.entity';
import { createIdModel } from '../src/utils/database.utils';


@Entity()
export default class FieldsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  values: string;

  @Column()
  type: string;

  collectionId: number;

  @ManyToOne(() => CollectionsEntity, item => item.fields)
  collection: CollectionsEntity;

  static fromDto(dto: IFieldEntityDto): FieldsEntity {
    const field = new FieldsEntity();

    field.name = dto.name;
    field.values = dto.values.join(',');
    field.type = dto.type;
    field.collection = createIdModel<CollectionsEntity>({ id: dto.collectionId });

    return field;
  }
}
