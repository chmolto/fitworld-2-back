import { EntityRepository, Repository } from 'typeorm';
import { Routine } from './routines.entity';

@EntityRepository(Routine)
export class RoutineRepository extends Repository<Routine> {}
