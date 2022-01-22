import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CollectionsEntity from './collections.entity';

@Entity()
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  fullName: string;

  @Column({ length: 500 })
  passwordHash: string;

  @OneToMany(() => CollectionsEntity, collection => collection.user)
  collections: CollectionsEntity[];
}
