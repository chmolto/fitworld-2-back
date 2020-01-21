import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {
    message: 'Invalid email',
  })
  email: string;

  captcha: string;
}
