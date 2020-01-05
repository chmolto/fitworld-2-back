import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async getRoutines(user: User): Promise<Routine[]> {
    return await this.routineRepository.getRoutines(user);
  }

  public async getRoutineByID(user: User, id: number): Promise<Routine> {
    return await this.routineRepository.getRoutineByID(user, id);
  }

  async deleteRoutine(id: number, user: User): Promise<void> {
    const result = await this.routineRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async setActiveRoutine(id: number, user: User): Promise<Routine> {
    return await this.routineRepository.setActiveRoutine(user, id);
  }
}
