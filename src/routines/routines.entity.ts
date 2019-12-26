import { User } from '../auth/user.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Routine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('timestamptz')
  creationDate: Date;

  @ManyToOne(
    type => User,
    user => user.routines,
    { eager: false },
  )
  user: User;

  constructor(name: string, creationDate: Date, user: User) {
    super();
    this.name = name;
    this.creationDate = creationDate;
    this.user = user;
  }
}
