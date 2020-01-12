import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Sets } from './sets.entity';
import { Repository } from 'typeorm';
import { RegisterWorkoutDto } from './dto/register-workout.dto';
import { User } from '../auth/user.entity';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseRepository } from '../exercises/exercises.repository';
import { ToolsService } from '../services/tools.service';
import { Exercise } from '../exercises/exercises.entity';

@EntityRepository(Sets)
export class SetsRepository extends Repository<Sets> {

  async getWorkoutById(workoutId: string, user: User): Promise<Sets[]> {
    return await this.find({
      workoutId,
      userId: user.id,
    });
  }

}
