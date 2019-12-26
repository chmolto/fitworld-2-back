import * as bcrypt from 'bcrypt';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Routine } from '../routines/routines.entity';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  height: number;

  @Column({
    nullable: true,
  })
  weight: number;

  @OneToMany(
    type => Routine,
    routine => routine.user,
    { eager: true },
  )
  routines: Routine[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
