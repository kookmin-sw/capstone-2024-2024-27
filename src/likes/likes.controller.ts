import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/user.guard';
import { LikesService } from './likes.service';
import { GetUser } from 'src/user/decorators/GetUser.decorator';
import { Payload } from 'src/user/dto/jwt-payload.dto';
import { Likes } from './entities/likes.entity';

@Controller('likes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @Post('/:profileId')
  @ApiParam({
    name: 'profileId',
    type: 'number',
    description: 'Profile ID',
  })
  @ApiResponse({
    status: 201,
    description: 'Like a profile',
    type: Likes,
  })
  async likeProfile(
    @Param('profileId') profileId: number,
    @GetUser() user: Payload,
  ): Promise<Likes> {
    return this.likesService.likeProfile(profileId, user.userId);
  }
}
