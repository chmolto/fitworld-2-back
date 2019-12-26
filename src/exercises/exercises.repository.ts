import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Exercise } from './exercises.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
@EntityRepository(Exercise)
export class ExerciseRepository extends Repository<Exercise> {
  public async createExercise(
    createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    const { name, muscles, antagonists } = createExerciseDto;
    const exercise = new Exercise(name, muscles, antagonists);
    try {
      await exercise.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return exercise;
  }
}
