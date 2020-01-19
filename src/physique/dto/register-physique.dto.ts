import {
  IsNumber,
  IsBase64,
  IsDecimal,
  ArrayMaxSize,
  Max,
  Min,
  IsOptional,
  IsDate,
  MaxDate,
} from 'class-validator';

export class RegisterPhysiqueDto {
  @Max(600)
  @Min(0)
  @IsNumber()
  weight: number;

  @Max(100)
  @Min(0)
  @IsNumber()
  @IsOptional()
  bodyfatPercent: number;

  @Max(100)
  @Min(0)
  @IsNumber()
  @IsOptional()
  musclemassPercent: number;

  @ArrayMaxSize(5)
  @IsBase64({
    each: true,
  })
  photos: string[];

  @IsDate()
  @IsOptional()
  // prevent insert in future dates
  @MaxDate(new Date())
  date: Date;
}
