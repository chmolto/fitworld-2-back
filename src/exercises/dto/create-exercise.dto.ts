import { IsString, MaxLength, IsArray } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsArray()
  muscles: string[];

  @IsArray()
  antagonists: string[];
}
