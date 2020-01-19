import { hash } from 'bcrypt';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Physique extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.routines,
    { eager: false },
  )
  user: User;

  @Column('varchar', { array: true, nullable: true })
  photos: string[];

  @Column()
  weight: number;

  @Column({ nullable: true })
  bodyfatPercent: number;

  @Column({ nullable: true })
  musclemassPercent: number;

  @Column()
  creationDate: Date;

  constructor(
    user: User,
    photos: string[],
    weight: number,
    bodyfatPercent: number,
    musclemassPercent: number,
    creationDate: Date,
  ) {
    super();
    this.user = user;
    this.photos = photos;
    this.weight = weight;
    this.bodyfatPercent = bodyfatPercent;
    this.musclemassPercent = musclemassPercent;
    this.creationDate = creationDate;
  }
}
