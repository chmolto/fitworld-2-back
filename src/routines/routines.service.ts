import { ToolsService } from '../services/tools.service';
import { ExerciseRepository } from './../exercises/exercises.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { RoutineRepository } from './routines.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRoutineDto,
  ExerciseRoutineModel,
} from './dto/create-routine.dto';
import { User } from '../auth/user.entity';
import { Routine } from './routines.entity';
import { uniqBy } from 'lodash';
import { ExerciseToRoutine } from '../exercise-routine/exercise-routine.entity';
import { ExerciseToRoutineRepository } from '../exercise-routine/exercise-routine.repository';
import { find } from 'lodash';
import { from, Observable } from 'rxjs';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(RoutineRepository)
    private routineRepository: RoutineRepository,
    @InjectRepository(ExerciseRepository)
    private exerciseRepository: ExerciseRepository,
    @InjectRepository(ExerciseToRoutineRepository)
    private exerciseToRoutineRepository: ExerciseToRoutineRepository,
    private toolsService: ToolsService,
  ) {}

  public async createRoutine(
    createRoutineDto: CreateRoutineDto,
    user: User,
  ): Promise<Routine> {
    const routineId: string = await this.toolsService.generateUniqId(
      this.routineRepository,
    );
    const { exercises, name, active } = createRoutineDto;
    const exercisesToRoutine = await this.getExercises(exercises, routineId);
    const routine = new Routine(
      routineId,
      name,
      user,
      exercisesToRoutine,
      active,
    );
    await this.toolsService.trySave(routine);
    delete routine.user;
    return routine;
  }

  public async getRoutines(user: User): Promise<Routine[]> {
    return await this.routineRepository.find({
      where: { userId: user.id },
    });
  }

  public getRoutineByID(user: User, id: string): Observable<Routine> {
    return from(
      this.routineRepository.findOne({
        where: { id, userId: user.id },
      }),
    );
  }

  async deleteRoutine(id: string, user: User): Promise<void> {
    const routine = await this.routineRepository.findOne({
      id,
      userId: user.id,
    });
    if (routine) {
      if (routine.active) {
        throw new UnauthorizedException(`Can't delete an active routine`);
      } else {
        await this.routineRepository.delete({ id, userId: user.id });
      }
    } else {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateRoutine(user: User, routineDto: CreateRoutineDto, id: string) {
    const routine = await this.routineRepository.findOne({
      id,
      userId: user.id,
    });
    await this.exerciseToRoutineRepository.delete({ routineId: id });
    await this.routineRepository.delete({ id, userId: user.id });
    if (routineDto.exercises && routineDto.exercises.length > 0) {
      routine.exerciseToRoutine = await this.getExercises(
        routineDto.exercises,
        id,
      );
    }
    if (routineDto.active) {
      await this.activateRoutine(user, id);
    }
    if (routineDto.name) {
      routine.name = routineDto.name;
    }
    await this.toolsService.trySave(routine);
    delete routine.user;
    return routine;
  }

  async activateRoutine(user: User, id: string): Promise<Routine> {
    const routines = await this.routineRepository.find({ userId: user.id });
    const newActive: Routine = find(routines, { id });
    const current: Routine = find(routines, { active: true });
    if (current) {
      if (current.id != id) {
        current.active = false;
        await this.toolsService.trySave(current);
      }
    }
    if (newActive) {
      newActive.active = true;
      return newActive;
    } else {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async setActiveRoutine(id: string, user: User): Promise<Routine> {
    const routine = await this.activateRoutine(user, id);
    await this.toolsService.trySave(routine);
    delete routine.user;
    return routine;
  }

  private async getExercises(
    allExercisesToRoutine: ExerciseRoutineModel[],
    routineId: string,
  ): Promise<ExerciseToRoutine[]> {
    const finalExercises: ExerciseToRoutine[] = [];
    for (let i = 0; i < allExercisesToRoutine.length; i++) {
      const exercise = await this.exerciseRepository.findOne({
        id: allExercisesToRoutine[i].exerciseId,
      });
      if (exercise) {
        const exerciseToRoutine = new ExerciseToRoutine(
          allExercisesToRoutine[i].day,
          routineId,
          exercise.id,
        );
        finalExercises.push(exerciseToRoutine);
      }
    }
    return finalExercises;
  }
}
