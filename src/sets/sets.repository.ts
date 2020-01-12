import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Sets } from './sets.entity';
import { Repository } from 'typeorm';

@EntityRepository(Sets)
export class SetsRepository extends Repository<Sets> {}
