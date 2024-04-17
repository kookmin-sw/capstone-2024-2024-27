import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './strategies/github.strategy';

@Module({
  imports: [PassportModule],
  providers: [GithubStrategy],
})
export class AuthModule {}
