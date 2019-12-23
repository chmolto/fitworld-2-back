import { GetUser } from '../constants/decorators/get-user-decorator';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { LoginCredentialsDto } from './dtos/login-credentials.dto';
import { UpdateCredentialsDto } from './dtos/update-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  public signIn(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken, user }> {
    return this.authService.signIn(loginCredentialsDto);
  }

  @Post('/update')
  @UseGuards(AuthGuard())
  public updateUser(
    @GetUser() user: User,
    @Body(ValidationPipe) updateCredentialsDto: UpdateCredentialsDto,
  ): Promise<User> {
    return this.authService.updateUser(updateCredentialsDto, user);
  }
}
