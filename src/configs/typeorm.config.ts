import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  console.log(process.env.DB_HOST);
  console.log(configService.get('DB_HOST'));
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'capstone',
    entities: [__dirname + '/../**/*.entity.{ts, js}'],
    synchronize: true,
    autoLoadEntities: true,
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
    extra: {
      timezone: 'UTC',
    },
  };
};
