import { Repository, EntityRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { ErrorConstants } from '../constants/error-constants';
import * as bcrypt from 'bcrypt';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginCredentialsDto } from './dtos/login-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      console.log('ASDASDASDDASADSDAS');

    } catch (error) {
      console.log(error);
      console.log('PORONGA');
      
      if (error.code === ErrorConstants.ERROR_UNIQUE_COLUMN) {
        if (error.detail.includes('Ya existe la llave (username)')) {
          throw new ConflictException('Username already exists');
        }
        if (error.detail.includes('Ya existe la llave (email)')) {
          throw new ConflictException('Email already exists');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<string> {
    const { username, password } = loginCredentialsDto;

    let user = await this.findOne({ username });
    if (!user) {
      user = await this.findOne({ email: username });
    }

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
