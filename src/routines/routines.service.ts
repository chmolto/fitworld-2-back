import { ExerciseRepository } from './../exercises/exercises.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RoutineRepository } from './routines.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { User } from 'src/auth/user.entity';
import { Routine } from './routines.entity';
import { Exercise } from 'src/exercises/exercises.entity';
import { uniq } from 'lodash';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(RoutineRepository)
    private routineRepository: RoutineRepository,
    @InjectRepository(ExerciseRepository)
    private exerciseRepository: ExerciseRepository,
  ) {}

  public async createRoutine(
    createRoutineDto: CreateRoutineDto,
    user: User,
  ): Promise<Routine> {
    const { exercisesId } = createRoutineDto;
    const exercises: Exercise[] = [];
    uniq(exercisesId).forEach(async exerciseId => {
      const exercise = await this.exerciseRepository.findOne({
        id: exerciseId,
      });
      if (exercise) {
        exercises.push(exercise);
      }
    });
    return await this.routineRepository.createRoutine(
      createRoutineDto,
      exercises,
      user,
    );
  }

  public async getRoutines(user: User): Promise<Routine[]> {
    return await this.routineRepository.getRoutines(user);
  }

  public async getRoutineByID(user: User, id: number): Promise<Routine> {
    return await this.routineRepository.getRoutineByID(user, id);
  }

  async deleteRoutine(id: number, user: User): Promise<void> {
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

  async setActiveRoutine(id: number, user: User): Promise<Routine> {
    return await this.routineRepository.setActiveRoutine(user, id);
  }

  async getExercise(id: number) {
    return await this.exerciseRepository.findOne({ id });
  }
}
