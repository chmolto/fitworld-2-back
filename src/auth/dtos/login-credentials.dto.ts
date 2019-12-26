import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
