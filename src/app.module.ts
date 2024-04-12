import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProjectController } from './project/project.controller';
import { ProjectModule } from './project/project.module';
import { LikesModule } from './likes/likes.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    ProjectModule,
    LikesModule,
    AuthModule,
  ],
  controllers: [ProjectController, AuthController],
  providers: [AuthService],
})
export class AppModule {}
