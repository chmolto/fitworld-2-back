import { User } from '../auth/user.entity';
import { Exercise } from '../exercises/exercises.entity';
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Routine } from '../routines/routines.entity';

@Entity()
export class ExerciseToRoutine extends BaseEntity {
  @Column()
  day: number;

  @ManyToOne(
    type => Routine,
    routine => routine.exerciseToRoutine,
    { primary: true },
  )
  @JoinTable()
  routineId: string;

  @ManyToOne(
    type => Exercise,
    exercise => exercise.exerciseToRoutine,
    { primary: true, eager: true },
  )
  @JoinTable()
  exerciseId: number;

  constructor(day: number, routineId: string, exerciseId: number) {
    super();
    this.day = day;
    this.routineId = routineId;
    this.exerciseId = exerciseId;
  }
}
