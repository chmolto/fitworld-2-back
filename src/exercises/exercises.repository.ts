import { EntityRepository, Repository } from 'typeorm';
import { Exercise } from './exercises.entity';
import { from, Observable } from 'rxjs';

@EntityRepository(Exercise)
export class ExerciseRepository extends Repository<Exercise> {}
