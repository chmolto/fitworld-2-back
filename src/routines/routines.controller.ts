import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
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

  @Get()
  getRoutines(@GetUser() user: User): Promise<Routine[]> {
    return this.routinesService.getRoutines(user);
  }

  @Get('/:id')
  getRoutineById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Routine> {
    return this.routinesService.getRoutineByID(user, id);
  }

  @Delete('/:id')
  deleteRoutineById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.routinesService.deleteRoutine(id, user);
  }

  @Patch('/:id')
  setActiveRoutine(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Routine> {
    return this.routinesService.setActiveRoutine(id, user);
  }
}
