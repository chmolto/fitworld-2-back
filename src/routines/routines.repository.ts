import { ExerciseRepository } from './../exercises/exercises.repository';
import { EntityRepository, Repository } from 'typeorm';
import { Routine } from './routines.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { User } from 'src/auth/user.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { find } from 'lodash';
import { Exercise } from 'src/exercises/exercises.entity';

@EntityRepository(Routine)
export class RoutineRepository extends Repository<Routine> {
  public async createRoutine(
    createRoutineDto: CreateRoutineDto,
    exercises: Exercise[],
    user: User,
  ): Promise<Routine> {
    const { name } = createRoutineDto;
    const currentDate = new Date();
    const routine = new Routine(name, currentDate, user, exercises, false);
    await this.trySaveRoutine(routine);
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
    const newActiveRoutine: Routine = find(routines, { id });
    const currentActiveRoutine: Routine = find(routines, { active: true });
    if (currentActiveRoutine) {
      currentActiveRoutine.active = false;
      await this.trySaveRoutine(currentActiveRoutine);
    }
    if (newActiveRoutine) {
      newActiveRoutine.active = true;
      await this.trySaveRoutine(newActiveRoutine);
      delete newActiveRoutine.user;
      return newActiveRoutine;
    } else {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  private async trySaveRoutine(routine: Routine) {
    try {
      await routine.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
