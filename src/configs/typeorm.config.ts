import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
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
});
