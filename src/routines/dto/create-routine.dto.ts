import { IsString, MaxLength, IsArray } from 'class-validator';
import { Exercise } from '../../exercises/exercises.entity';

export class CreateRoutineDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsArray()
  exercises: Exercise[];
}
