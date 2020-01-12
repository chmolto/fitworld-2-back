import { ExerciseToRoutineRepository } from './../exercise-routine/exercise-routine.repository';
import { ExerciseRepository } from './../exercises/exercises.repository';
import { Module } from '@nestjs/common';
import { RoutinesController } from './routines.controller';
import { RoutinesService } from './routines.service';
import { RoutineRepository } from './routines.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ToolsService } from '../services/tools.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoutineRepository,
      ExerciseRepository,
      ExerciseToRoutineRepository,
    ]),
    AuthModule,
  ],
  controllers: [RoutinesController],
  providers: [RoutinesService, ToolsService],
})
export class RoutinesModule {}
