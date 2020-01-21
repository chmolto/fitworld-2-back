import { Controller, Post, Body, Get } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './exercises.entity';
import { Observable } from 'rxjs';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Post()
  public async createExercise(
    @Body() createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    return await this.exercisesService.createExercise(createExerciseDto);
  }

  @Get()
  public getAllExercises(): Observable<Exercise[]> {
    return this.exercisesService.getAllExercises();
  }
}
