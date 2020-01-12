import { IsNumber } from 'class-validator';

export class RegisterWorkoutDto {
  @IsNumber()
  order: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  repetitions: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  exerciseId: number;
}
