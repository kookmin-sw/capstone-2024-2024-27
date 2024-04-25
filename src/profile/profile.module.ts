import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { JwtStrategy } from 'src/user/strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UserModule, LikesModule],
  controllers: [ProfileController],
  providers: [ProfileService, JwtService, ConfigService, JwtStrategy],
})
export class ProfileModule {}