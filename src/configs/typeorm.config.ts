import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: 'localhost',
  port: 3306,
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
