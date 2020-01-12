import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SetsRepository } from './sets.repository';
import { RegisterWorkoutDto } from './dto/register-workout.dto';
import { User } from '../auth/user.entity';
import { threadId } from 'worker_threads';
import { Sets } from './sets.entity';
import { ExerciseRepository } from '../exercises/exercises.repository';
import { ToolsService } from '../services/tools.service';

@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(SetsRepository)
    private setsRepository: SetsRepository,
    @InjectRepository(ExerciseRepository)
    private exerciseRepository: ExerciseRepository,
    private toolsService: ToolsService,
  ) {}

  async registerWorkout(
    workoutDto: RegisterWorkoutDto[],
    user: User,
    routineId: string,
  ): Promise<void> {
    const date = new Date();
    for (let i = 0; i < workoutDto.length; i++) {
      const uuid = await this.toolsService.generateUniqId(this.setsRepository);
      const exercise = await this.exerciseRepository.findOne({
        id: workoutDto[i].exerciseId,
      });
      const sets = new Sets(
        uuid,
        routineId,
        user.id,
        date,
        workoutDto[i].order,
        workoutDto[i].quantity,
        workoutDto[i].repetitions,
        workoutDto[i].weight,
        exercise,
      );
      await this.toolsService.trySave(sets);
    }
  }

  async getWorkoutById(workoutId: string, user: User): Promise<Sets[]> {
    return await this.setsRepository.getWorkoutById(workoutId, user);
  }
}
