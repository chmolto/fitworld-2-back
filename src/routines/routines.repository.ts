import { EntityRepository, Repository } from 'typeorm';
import { Routine } from './routines.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { User } from '../auth/user.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { find } from 'lodash';
import { ExerciseToRoutine } from '../exercise-routine/exercise-routine.entity';

@EntityRepository(Routine)
export class RoutineRepository extends Repository<Routine> {
  public async createRoutine(
    routineId: string,
    createRoutineDto: CreateRoutineDto,
    exercisesToRoutine: ExerciseToRoutine[],
    user: User,
  ): Promise<Routine> {
    const { name, active } = createRoutineDto;
    const currentDate = new Date();
    const routine = new Routine(
      routineId,
      name,
      currentDate,
      user,
      exercisesToRoutine,
      active,
    );
    await this.trySaveRoutine(routine);
    delete routine.user;
    return routine;
  }

  public async getRoutines(user: User): Promise<Routine[]> {
    return await this.find({
      where: { userId: user.id },
    });
  }

  public async getRoutineByID(user: User, id: string): Promise<any> {
    return await this.findOne({
      where: { id, userId: user.id },
    });
  }

  async activateRoutine(user: User, id: string): Promise<Routine> {
    const routines = await this.find({ userId: user.id });
    const newActiveRoutine: Routine = find(routines, { id });
    const currentActiveRoutine: Routine = find(routines, { active: true });
    if (currentActiveRoutine) {
      if (currentActiveRoutine.id != id) {
        currentActiveRoutine.active = false;
        await this.trySaveRoutine(currentActiveRoutine);
      }
    }
    if (newActiveRoutine) {
      newActiveRoutine.active = true;
      return newActiveRoutine;
    } else {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateActivateRoutine(user: User, id: string) {
    const routine = await this.activateRoutine(user, id);
    this.trySaveRoutine(routine);
    delete routine.user;
    return routine;
  }

  private async trySaveRoutine(routine: Routine) {
    try {
      await routine.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateRoutine(user: User, routine: Routine) {
    const routineDB = await this.findOne({ id: routine.id });
    if (routineDB) {
      if (routine.active) {
        await this.activateRoutine(user, routine.id);
      }
      routine.creationDate = routineDB.creationDate;
      this.trySaveRoutine(routine);
    } else {
      throw new NotFoundException();
    }
  }
}
