import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './exercises.entity';
import { ExerciseRepository } from './exercises.repository';

@Injectable()
export class ExercisesService {
    constructor(
        @InjectRepository(ExerciseRepository)
        private exerciseRepository: ExerciseRepository,
      ) {}
    
      public async createExercise(
        createExerciseDto: CreateExerciseDto,
      ): Promise<Exercise> {
        return await this.exerciseRepository.createExercise(createExerciseDto);
      }
}
