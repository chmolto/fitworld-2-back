import { Repository, EntityRepository } from 'typeorm';
import { ExerciseToRoutine } from './exercise-routine.entity';

@EntityRepository(ExerciseToRoutine)
export class ExerciseToRoutineRepository extends Repository<ExerciseToRoutine> {}
