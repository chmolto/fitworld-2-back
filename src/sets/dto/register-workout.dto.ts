import { IsNumber, IsDate, IsOptional, MaxDate } from 'class-validator';

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

  @IsDate()
  @IsOptional()
  // prevent insert in future dates
  @MaxDate(new Date())
  date: Date;
}
