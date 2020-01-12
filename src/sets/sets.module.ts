import { AuthModule } from './../auth/auth.module';
import { SetsRepository } from './sets.repository';
import { ExerciseRepository } from '../exercises/exercises.repository';
import { SetsController } from './sets.controller';
import { ToolsService } from '../services/tools.service';
import { SetsService } from './sets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([SetsRepository, ExerciseRepository]),
    AuthModule,
  ],
  controllers: [SetsController],
  providers: [SetsService, ToolsService],
})
export class SetsModule {}
