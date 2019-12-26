import { IsString, MaxLength } from 'class-validator';

export class CreateRoutineDto {
  @IsString()
  @MaxLength(50)
  name: string;
}