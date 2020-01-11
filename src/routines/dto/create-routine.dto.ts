import { IsString, MaxLength, IsArray, IsBoolean } from 'class-validator';

export class CreateRoutineDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsArray()
  @MaxLength(20)
  exercises: ExerciseRoutineModel[];

  @IsBoolean()
  active: boolean;
}

export interface ExerciseRoutineModel {
  exerciseId: number;
  day: number;
}
