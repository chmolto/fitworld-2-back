import { IsString, MaxLength, IsArray } from 'class-validator';
import { MuscleGroups } from '../exercises.entity';

export class CreateExerciseDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsArray()
  muscleGroups: MuscleGroups[];

  @IsArray()
  muscles: string[];

  @IsArray()
  antagonists: string[];
}
