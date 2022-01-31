import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import CollectionsEntity from './collections.entity';
import UserEntity from './user.entity';

@Entity()
export default class LikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CollectionsEntity, collection => collection.likes)
  collection: CollectionsEntity;

  @ManyToOne(() => UserEntity, user => user.collections)
  user: UserEntity;
}
