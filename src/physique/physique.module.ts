import { AuthModule } from './../auth/auth.module';
import { ToolsService } from '../services/tools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PhysiqueRepository } from './physique.repository';
import { PhysiqueController } from './physique.controller';
import { PhysiqueService } from './physique.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhysiqueRepository]),
    AuthModule,
  ],
  controllers: [PhysiqueController],
  providers: [PhysiqueService, ToolsService],
})
export class PhysiqueModule {}