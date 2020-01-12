import { EntityRepository, Repository } from 'typeorm';
import { Exercise } from './exercises.entity';

@EntityRepository(Exercise)
export class ExerciseRepository extends Repository<Exercise> {}
