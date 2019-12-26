import { Injectable } from '@nestjs/common';
import { RoutineRepository } from './routines.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { User } from 'src/auth/user.entity';
import { Routine } from './routines.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(RoutineRepository)
    private routineRepository: RoutineRepository,
  ) {}

  public async createRoutine(
    createRoutineDto: CreateRoutineDto,
    user: User,
  ): Promise<Routine> {
    return await this.routineRepository.createRoutine(createRoutineDto, user);
  }
}
