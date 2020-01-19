import { EntityRepository, Repository } from 'typeorm';
import { Physique } from './physique.entity';

@EntityRepository(Physique)
export class PhysiqueRepository extends Repository<Physique> {}
