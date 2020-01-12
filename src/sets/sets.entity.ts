import { Exercise } from '../exercises/exercises.entity';
import { Routine } from '../routines/routines.entity';
import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Sets extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workoutId: string;

  @Column()
  userId: number;

  @Column("timestamptz")
  creationDate: Date;

  @Column()
  order: number;

  @Column()
  quantity: number;

  @Column()
  repetitions: number;

  @Column()
  weight: number;

  @ManyToOne(
    type => Exercise,
    exercise => exercise.set,
    { eager: true },
  )
  exercise: Exercise;

  @ManyToOne(
    type => Routine,
    routine => routine.sets,
  )
  routineId: string;

  constructor(
    workoutId: string,
    routineId: string,
    userId: number,
    creationDate: Date,
    order: number,
    quantity: number,
    repetitions: number,
    weight: number,
    exercise: Exercise,
  ) {
    super();
    this.workoutId = workoutId;
    this.routineId = routineId;
    this.userId = userId;
    this.creationDate = creationDate;
    this.order = order;
    this.quantity = quantity;
    this.repetitions = repetitions;
    this.weight = weight;
    this.exercise = exercise;
  }
}
