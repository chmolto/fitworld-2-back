import { Controller, Post, Body } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './exercises.entity';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Post()
  public async createRoutine(
    @Body() createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    return await this.exercisesService.createExercise(createExerciseDto);
  }
}
