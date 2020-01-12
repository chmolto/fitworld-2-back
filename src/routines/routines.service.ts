import { ToolsService } from '../services/tools.service';
import { ExerciseRepository } from './../exercises/exercises.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RoutineRepository } from './routines.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRoutineDto,
  ExerciseRoutineModel,
} from './dto/create-routine.dto';
import { User } from '../auth/user.entity';
import { Routine } from './routines.entity';
import { Exercise } from '../exercises/exercises.entity';
import { uniqBy } from 'lodash';
import { ExerciseToRoutine } from '../exercise-routine/exercise-routine.entity';
import { ExerciseToRoutineRepository } from '../exercise-routine/exercise-routine.repository';

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
    const { exercises } = createRoutineDto;
    const exercisesToRoutine = await this.getCleanExercises(
      exercises,
      routineId,
    );

    return await this.routineRepository.createRoutine(
      routineId,
      createRoutineDto,
      exercisesToRoutine,
      user,
    );
  }

  public async getRoutines(user: User): Promise<Routine[]> {
    return await this.routineRepository.getRoutines(user);
  }

  public async getRoutineByID(user: User, id: string): Promise<Routine> {
    return await this.routineRepository.getRoutineByID(user, id);
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
        this.routineRepository.delete({ id, userId: user.id });
      }
    } else {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateRoutine(user: User, routineDto: CreateRoutineDto, id: string) {
    await this.exerciseToRoutineRepository.delete({ routineId: id });
    const exerciseToRoutine: ExerciseToRoutine[] = await this.getCleanExercises(
      routineDto.exercises,
      id,
    );
    const routine = new Routine(
      id,
      routineDto.name,
      user,
      exerciseToRoutine,
      routineDto.active,
    );
    this.routineRepository.updateRoutine(user, routine);
  }

  async setActiveRoutine(id: string, user: User): Promise<Routine> {
    return await this.routineRepository.updateActivateRoutine(user, id);
  }

  private async getCleanExercises(
    exercises: ExerciseRoutineModel[],
    routineId: string,
  ): Promise<ExerciseToRoutine[]> {
    const exercisesNoRepeated: ExerciseRoutineModel[] = uniqBy(
      exercises,
      'exerciseId',
    );
    return await this.getExercises(exercisesNoRepeated, routineId);
  }

  private async getExercises(
    allExercisesToRoutine: ExerciseRoutineModel[],
    routineId: string,
  ) {
    const exercisesToRoutine: ExerciseToRoutine[] = [];
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
        exercisesToRoutine.push(exerciseToRoutine);
      }
    }
    return exercisesToRoutine;
  }
}
