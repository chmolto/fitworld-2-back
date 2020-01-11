/* import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { ExerciseToRoutine } from 'src/exercise-routine/exercise-routine.entity';

@Entity()
export class Routine extends BaseEntity {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()


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

  constructor() {
    super();
  }
}
 */