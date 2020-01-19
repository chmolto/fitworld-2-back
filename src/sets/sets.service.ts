import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SetsRepository } from './sets.repository';
import { RegisterWorkoutDto } from './dto/register-workout.dto';
import { User } from '../auth/user.entity';
import { Sets } from './sets.entity';
import { ExerciseRepository } from '../exercises/exercises.repository';
import { ToolsService } from '../services/tools.service';
import { DeleteResult } from 'typeorm';

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
    const uuid = await this.toolsService.generateUniqId(
      this.setsRepository,
      'workoutId',
    );
    for (let i = 0; i < workoutDto.length; i++) {
      const exercise = await this.exerciseRepository.findOne({
        id: workoutDto[i].exerciseId,
      });
      const date = workoutDto[i].date ? workoutDto[i].date : new Date();
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
    return await this.setsRepository.find({
      workoutId,
      userId: user.id,
    });
  }

  async deleteWorkoutById(workoutId: string, user: User): Promise<void> {
    const result = await this.setsRepository.delete({
      workoutId,
      userId: user.id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }
  }

  async deleteSetById(id: number, user: User): Promise<void> {
    const result = await this.setsRepository.delete({
      id,
      userId: user.id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Set with ID ${id} not found`);
    }
  }
}
