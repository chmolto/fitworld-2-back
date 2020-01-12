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
  Put,
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
  createRoutine(
    @Body() createRoutineDto: CreateRoutineDto,
    @GetUser() user: User,
  ): Promise<Routine> {
    return this.routinesService.createRoutine(createRoutineDto, user);
  }

  @Get()
  getRoutines(@GetUser() user: User): Promise<Routine[]> {
    return this.routinesService.getRoutines(user);
  }

  @Get('/:id')
  getRoutineById(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Routine> {
    return this.routinesService.getRoutineByID(user, id);
  }

  @Delete('/:id')
  deleteRoutineById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.routinesService.deleteRoutine(id, user);
  }

  @Put('/:id')
  updateRoutine(
    @Body() routineDto: CreateRoutineDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    this.routinesService.updateRoutine(user, routineDto, id);
  }

  @Patch('/:id')
  setActiveRoutine(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Routine> {
    return this.routinesService.setActiveRoutine(id, user);
  }
}
