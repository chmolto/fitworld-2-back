import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { ErrorConstants } from '../constants/error-constants';
import { hash, genSalt } from 'bcrypt';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginCredentialsDto } from './dtos/login-credentials.dto';
import { UpdateCredentialsDto } from './dtos/update-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code == ErrorConstants.ERROR_UNIQUE_COLUMN) {
        if (error.detail.includes('(username)')) {
          throw new ConflictException('Username already exists');
        }
        if (error.detail.includes('(email)')) {
          throw new ConflictException('Email already exists');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<User> {
    const { username, password } = loginCredentialsDto;

    let user = await this.findOne({ username });
    if (!user) {
      user = await this.findOne({ email: username });
    }

    if (user && (await user.validatePassword(password))) {
      delete user.salt;
      delete user.password;
      delete user.routines;
      return user;
    } else {
      return null;
    }
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

    user.save();
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
