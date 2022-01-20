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

@Entity()
export default class ItemsEntity extends BaseEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  image: string;

  // n:1 relation with collection
  @ManyToOne(type => CollectionsEntity, collection => collection.items)
  collection: CollectionsEntity;

  @OneToMany( type => FieldsEntity, field => field.item)
  field: FieldsEntity[];

}
