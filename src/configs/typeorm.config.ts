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
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DBNAME'),
    entities: [__dirname + '/../**/*.entity.{ts, js}'],
    synchronize: true,
    autoLoadEntities: true,
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,
    extra: {
      timezone: 'UTC',
    },
  };
};
