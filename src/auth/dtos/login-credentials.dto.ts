import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
