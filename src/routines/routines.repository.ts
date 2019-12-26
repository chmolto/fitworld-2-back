import { EntityRepository, Repository } from 'typeorm';
import { Routine } from './routines.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
@EntityRepository(Routine)
export class RoutineRepository extends Repository<Routine> {
  public async createRoutine(
    createRoutineDto: CreateRoutineDto,
    user: User,
  ): Promise<Routine> {
    const { name } = createRoutineDto;
    const currentDate = new Date();
    const routine = new Routine(name, currentDate, user);
    try {
      await routine.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    delete routine.user;
    return routine;
  }
}
