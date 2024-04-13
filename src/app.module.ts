import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LikesModule } from './likes/likes.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './configs/typeorm.config';
import { ProfileModule } from './profile/profile.module';
import { ProfileController } from './profile/profile.controller';

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
    LikesModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AuthController, ProfileController],
  providers: [AuthService],
})
export class AppModule {}
