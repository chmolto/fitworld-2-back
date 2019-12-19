import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Pool } from "pg";

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || serverConfig.port;
  app.enableCors();
  await app.listen(port);
}
bootstrap();
