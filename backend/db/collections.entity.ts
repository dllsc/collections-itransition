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

@Entity()
export default class CollectionsEntity extends BaseEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 500 })
  theme: string;

  // n:1 relation with collection
  @ManyToOne(type => UserEntity, user => user.collections)
  user: UserEntity;

  @OneToMany( type => ItemsEntity, items => items.collection)
  items: ItemsEntity[];

}
