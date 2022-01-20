import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BookEntity from './book.entity';
import CollectionsEntity from './collections.entity';
import GenreEntity from './genre.entity';

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

  @OneToMany( type => CollectionsEntity , collection => collection.user)
  collections: CollectionsEntity[];

  // 1:n relation with bookEntity
  @OneToMany( type => BookEntity , book => book.user)
  books: BookEntity[];

}
