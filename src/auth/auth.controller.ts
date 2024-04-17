import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {
    // 요청이 GitHub로 리다이렉트됩니다.
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req) {
    // GitHub에서 콜백 요청을 처리합니다.
    // 사용자 정보가 req.user에 포함되어 반환됩니다.
    return req.user;
  }
}
