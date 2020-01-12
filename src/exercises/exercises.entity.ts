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
  JoinColumn,
} from 'typeorm';

@Entity()
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { array: true })
  muscles: string[];

  @Column('varchar', { array: true })
  antagonists: string[];

  @OneToMany(
    type => ExerciseToRoutine,
    exerciseToRoutine => exerciseToRoutine.exerciseId,
  )
  public exerciseToRoutine: ExerciseToRoutine[];

  @OneToMany(
    type => Sets,
    sets => sets.exercise,
  )
  public set: Sets;

  constructor(name: string, muscles: string[], antagonists: string[]) {
    super();
    this.name = name;
    this.muscles = muscles;
    this.antagonists = antagonists;
  }
}
