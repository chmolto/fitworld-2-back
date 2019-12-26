import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { GetUser } from '../constants/decorators/get-user-decorator';
import { User } from '../auth/user.entity';
import { Routine } from './routines.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('routines')
@UseGuards(AuthGuard())
export class RoutinesController {
  constructor(private routinesService: RoutinesService) {}

  @Post()
  public async createRoutine(
    @Body() createRoutineDto: CreateRoutineDto,
    @GetUser() user: User,
  ): Promise<Routine> {
    return await this.routinesService.createRoutine(createRoutineDto, user);
  }
}
