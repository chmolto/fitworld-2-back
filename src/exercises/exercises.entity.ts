import { ExerciseToRoutine } from '../exercise-routine/exercise-routine.entity';
import { User } from '../auth/user.entity';
import { Sets } from '../sets/sets.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export type MuscleGroups =
  | 'Chest'
  | 'Back'
  | 'Legs'
  | 'Arms'
  | 'Shoulders'
  | 'Abs';

@Entity()
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { array: true })
  muscleGroup: MuscleGroups[];

  @Column('varchar', { array: true })
  muscles: string[];

  @Column('varchar', { array: true })
  antagonists: string[];

  @OneToMany(
    type => ExerciseToRoutine,
    exerciseToRoutine => exerciseToRoutine.exercise,
  )
  public exerciseToRoutine: ExerciseToRoutine[];

  @OneToMany(
    type => Sets,
    sets => sets.exercise,
  )
  public set: Sets;

  constructor(
    name: string,
    muscleGroup: MuscleGroups[],
    muscles: string[],
    antagonists: string[],
  ) {
    super();
    this.name = name;
    this.muscleGroup = muscleGroup;
    this.muscles = muscles;
    this.antagonists = antagonists;
  }
}
