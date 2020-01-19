import { User } from '../auth/user.entity';
import { Exercise } from '../exercises/exercises.entity';
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { ExerciseToRoutine } from '../exercise-routine/exercise-routine.entity';
import { Sets } from '../sets/sets.entity';

@Entity()
export class Routine extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @CreateDateColumn()
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

  @OneToMany(
    type => ExerciseToRoutine,
    exerciseToRoutine => exerciseToRoutine.routineId,
    {
      cascade: true,
      eager: true,
    },
  )
  public exerciseToRoutine: ExerciseToRoutine[];

  @OneToMany(
    type => Sets,
    sets => sets.routineId,
  )
  public sets: Sets;

  constructor(
    id: string,
    name: string,
    user: User,
    exerciseToRoutine: ExerciseToRoutine[],
    active: boolean,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.user = user;
    this.exerciseToRoutine = exerciseToRoutine;
    this.active = active;
  }
}
