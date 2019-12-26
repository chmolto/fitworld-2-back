import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { RoutinesModule } from './routines/routines.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, RoutinesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
