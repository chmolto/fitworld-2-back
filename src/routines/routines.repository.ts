import { EntityRepository, Repository } from 'typeorm';
import { Routine } from './routines.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { User } from 'src/auth/user.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { find } from 'lodash';

@EntityRepository(Routine)
export class RoutineRepository extends Repository<Routine> {
  public async createRoutine(
    createRoutineDto: CreateRoutineDto,
    user: User,
  ): Promise<Routine> {
    const { name, exercises } = createRoutineDto;
    const currentDate = new Date();
    const routine = new Routine(name, currentDate, user, exercises, false);
    try {
      await routine.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    delete routine.user;
    return routine;
  }

  public async getRoutines(user: User): Promise<Routine[]> {
    return await this.find({
      where: { userId: user.id },
    });
  }

  public async getRoutineByID(user: User, id: number): Promise<Routine> {
    return await this.findOne({
      where: { id, userId: user.id },
    });
  }

  async setActiveRoutine(user: User, id: number): Promise<Routine> {
    const routines = await this.find({ userId: user.id });
    let newActiveRoutine: Routine = find(routines, { id });
    let currentActiveRoutine: Routine = find(routines, { active: true });
    if (currentActiveRoutine) {
      // [TODO] unset active
      console.log(currentActiveRoutine);
    }
    if (newActiveRoutine) {
      newActiveRoutine.active = true;
      try {
        await newActiveRoutine.save();
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
      delete newActiveRoutine.user;
      return newActiveRoutine;
    } else {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
