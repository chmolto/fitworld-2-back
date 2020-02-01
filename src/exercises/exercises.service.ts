import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './exercises.entity';
import { ExerciseRepository } from './exercises.repository';
import { ToolsService } from '../services/tools.service';
import { from, Observable } from 'rxjs';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExerciseRepository)
    private exerciseRepository: ExerciseRepository,
    private toolsService: ToolsService,
  ) {}

  public async createExercise(
    createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    const { name, muscleGroups, muscles, antagonists } = createExerciseDto;
    const exercise = new Exercise(name, muscleGroups, muscles, antagonists);
    await this.toolsService.trySave(exercise);
    return exercise;
  }

  public getAllExercises(): Observable<Exercise[]> {
    return from(this.exerciseRepository.find());
  }
}
