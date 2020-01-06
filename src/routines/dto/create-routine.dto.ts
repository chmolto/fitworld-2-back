import { IsString, MaxLength, IsArray } from 'class-validator';

export class CreateRoutineDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsArray()
  @MaxLength(20)
  exercisesId: number[];
}
