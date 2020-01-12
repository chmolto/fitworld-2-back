import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.model';
import { LoginCredentialsDto } from './dtos/login-credentials.dto';
import { UpdateCredentialsDto } from './dtos/update-credentials.dto';
import { User } from './user.entity';
import { hash, genSalt } from 'bcrypt';
import { ToolsService } from '../services/tools.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private toolsService: ToolsService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await genSalt();
    user.password = await this.hashPassword(password, user.salt);
    await this.toolsService.trySave(user);
  }

  async signIn(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken; user }> {
    const { username, password } = loginCredentialsDto;

    let user = await this.userRepository.findOne({ username });
    if (!user) {
      user = await this.userRepository.findOne({ email: username });
    }

    if (user && (await user.validatePassword(password))) {
      delete user.salt;
      delete user.password;
      delete user.routines;
    } else {
      user = null;
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, user };
  }

  async updateUser(
    updateCredentialsDto: UpdateCredentialsDto,
    user: User,
  ): Promise<User> {
    updateCredentialsDto.username != null
      ? (user.username = updateCredentialsDto.username)
      : null;

    updateCredentialsDto.password != null
      ? (user = await this.setNewPassword(updateCredentialsDto, user))
      : null;

    updateCredentialsDto.height != null
      ? (user.height = updateCredentialsDto.height)
      : null;

    updateCredentialsDto.weight != null
      ? (user.weight = updateCredentialsDto.weight)
      : null;

    updateCredentialsDto.image != null
      ? (user.image = updateCredentialsDto.image)
      : null;

    this.toolsService.trySave(user);
    delete user.salt;
    delete user.password;
    return user;
  }

  private async setNewPassword(
    updateCredentialsDto: UpdateCredentialsDto,
    user: User,
  ): Promise<User> {
    if (await user.validatePassword(updateCredentialsDto.oldPassword)) {
      user.password = await this.hashPassword(
        updateCredentialsDto.password,
        user.salt,
      );
    } else {
      throw new ConflictException('Current password incorrect');
    }
    return user;
  }

  private async hashPassword(password: string, salt: string) {
    return hash(password, salt);
  }
}
