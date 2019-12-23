import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import * as PostgressConnectionStringParser from 'pg-connection-string';

let connectionOptions
if (process.env.DATABASE_URL) {
  connectionOptions = PostgressConnectionStringParser.parse(
    process.env.DATABASE_URL,
  );
}

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host || connectionOptions.host,
  port: dbConfig.port || Number.parseInt(connectionOptions.port),
  username: dbConfig.username || connectionOptions.user,
  password: dbConfig.password || connectionOptions.password,
  database: dbConfig.database || connectionOptions.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
