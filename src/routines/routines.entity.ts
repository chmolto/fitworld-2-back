import { User } from '../auth/user.entity';
import { Exercise } from '../exercises/exercises.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Routine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('timestamptz')
  creationDate: Date;

  @Column('boolean')
  active: boolean;

  @ManyToOne(
    type => User,
    user => user.routines,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  @ManyToMany(type => Exercise)
  @JoinTable()
  exercises: Exercise[];

  constructor(
    name: string,
    creationDate: Date,
    user: User,
    exercises: Exercise[],
    active: boolean
  ) {
    super();
    this.name = name;
    this.creationDate = creationDate;
    this.user = user;
    this.exercises = exercises;
    this.active = active;
  }
}
