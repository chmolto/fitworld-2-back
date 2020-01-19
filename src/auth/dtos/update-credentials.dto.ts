import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNumber,
  IsOptional,
  IsBase64,
  Max,
  Min,
} from 'class-validator';

export class UpdateCredentialsDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  oldPassword: string;

  @Max(3)
  @Min(1)
  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsString()
  @IsBase64()
  image: string;
}
