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
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { ExerciseToRoutine } from '../exercise-routine/exercise-routine.entity';

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
