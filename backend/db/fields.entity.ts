import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import ItemsEntity from './items.entity';

@Entity()
export default class FieldsEntity extends BaseEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  stringValue: string;

  @Column()
  numberValue: number;

  @Column()
  dateValue: Date;

  @ManyToOne(type => ItemsEntity, item => item.field)
  item: ItemsEntity;

}
