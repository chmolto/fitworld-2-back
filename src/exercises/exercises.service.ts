import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './exercises.entity';
import { ExerciseRepository } from './exercises.repository';
import { ToolsService } from '../services/tools.service';

@Injectable()
export class ExercisesService {
  constructor(private toolsService: ToolsService) {}

  public async createExercise(
    createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    const { name, muscles, antagonists } = createExerciseDto;
    const exercise = new Exercise(name, muscles, antagonists);
    await this.toolsService.trySave(exercise);
    return exercise;
  }
}
