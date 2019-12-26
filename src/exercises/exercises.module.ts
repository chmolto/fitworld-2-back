import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseRepository } from './exercises.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseRepository])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
