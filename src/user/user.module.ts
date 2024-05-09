import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {},
    }),
    PassportModule,
    forwardRef(() => ProfileModule),
    forwardRef(() => LikesModule),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
