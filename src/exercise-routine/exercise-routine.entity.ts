import { User } from '../auth/user.entity';
import { Exercise } from '../exercises/exercises.entity';
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Routine } from '../routines/routines.entity';

@Entity()
export class ExerciseToRoutine extends BaseEntity {
  @PrimaryGeneratedColumn()
  public exerciseToRoutineId: number;

  @Column()
  day: number;

  @ManyToOne(
    type => Routine,
    routine => routine.exerciseToRoutine,
    { primary: true },
  )
  routine: Routine;

  @ManyToOne(
    type => Exercise,
    exercise => exercise.exerciseToRoutine,
    { primary: true },
  )
  exercise: Exercise;

  @Column()
  exerciseId: number;

  @Column()
  routineId: string;

  constructor(day: number, routineId: string, exerciseId: number) {
    super();
    this.day = day;
    this.routineId = routineId;
    this.exerciseId = exerciseId;
  }
}
