import { RegisterWorkoutDto } from './dto/register-workout.dto';
import {
  Controller,
  UseGuards,
  Post,
  Param,
  Body,
  Get,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { SetsService } from './sets.service';
import { GetUser } from '../constants/decorators/get-user-decorator';
import { User } from '../auth/user.entity';
import { Sets } from './sets.entity';

@Controller('sets')
@UseGuards(AuthGuard())
export class SetsController {
  constructor(private setsService: SetsService) {}

  @Post('/:id')
  registerWorkout(
    @Body() workoutDtos: RegisterWorkoutDto[],
    @GetUser() user: User,
    @Param('id') routineId: string,
  ): Promise<void> {
    return this.setsService.registerWorkout(workoutDtos, user, routineId);
  }

  @Get('/:id')
  getWorkout(
    @Param('id') routineId: string,
    @GetUser() user: User,
  ): Promise<Sets[]> {
    return this.setsService.getWorkoutById(routineId, user);
  }
}
