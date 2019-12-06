import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'tortugo21',
    database: 'fitworld',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}